import { connectDb } from "@/lib/drivers/db";
import { buildMarkdownWithFrontmatter } from "@/lib/helper/frontmatter";
import { decryptToken } from "@/lib/helper/encryption";
import { BlogPlatform } from "@/lib/types/blog.types";
import { IntegrationDataType } from "@/lib/types/global.types";
import { GithubFormState } from "@/lib/types/platform.types";
import { Blog } from "@/models/blog.model";
import { GithubPublishConfig } from "@/models/platform.model";
import { User } from "@/models/user.model";

export type PublishResult = {
  platform: BlogPlatform;
  success: boolean;
  message: string;
};

/**
 * Validates a GitHub Personal Access Token by calling GitHub GET /user endpoint
 */
export async function verifyGithubToken(token: string) {
  if (!token || !token.trim()) {
    throw new Error("Please enter a valid GitHub Personal Access Token");
  }

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "BlogIt-App",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Invalid GitHub Personal Access Token");
  }

  return {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
  };
}

/**
 * Publishes/Commits a blog post to a GitHub repository with custom YAML frontmatter
 */
export async function publishToGithub(
  blogId: string,
  userId: string,
  githubForm: GithubFormState
): Promise<PublishResult> {
  const { owner, repo, branch, filePath, commitMessage, customFields } = githubForm;

  if (!owner.trim() || !repo.trim() || !filePath.trim()) {
    throw new Error("GitHub Repository Owner, Repo Name, and File Path are required.");
  }

  await connectDb();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist.");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error("Blog post does not exist.");
  }

  const userGithubAcc = user.connections.find(
    (c: IntegrationDataType) => c.platform === "github"
  );

  if (!userGithubAcc || !userGithubAcc.apiKey) {
    throw new Error("You haven't connected your GitHub token yet. Please connect in Settings -> Integrations.");
  }

  const token = decryptToken(userGithubAcc.apiKey);

  // Build the markdown file content with YAML Frontmatter
  const finalFileContent = buildMarkdownWithFrontmatter({
    title: githubForm.title || blog.title,
    coverImage: blog.coverImage,
    tags: blog.tags || [],
    content: githubForm.content || blog.content,
    customFields: customFields || [],
  });

  // Convert string to Base64
  const contentBase64 = Buffer.from(finalFileContent, "utf-8").toString("base64");

  const cleanBranch = branch.trim() || "main";
  const cleanPath = filePath.trim().replace(/^\//, ""); // remove leading slash if present

  // Step 1: Check if the file already exists on GitHub to get its SHA (required for updating existing files)
  let existingSha: string | undefined = undefined;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${owner.trim()}/${repo.trim()}/contents/${cleanPath}?ref=${cleanBranch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "BlogIt-App",
        },
      }
    );
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      existingSha = checkData.sha;
    }
  } catch (err) {
    console.warn("File check on GitHub encountered an error, proceeding with creation:", err);
  }

  // Step 2: PUT request to create or update file in repository
  const putBody: Record<string, unknown> = {
    message: commitMessage.trim() || `feat(blog): publish "${blog.title}"`,
    content: contentBase64,
    branch: cleanBranch,
  };

  if (existingSha) {
    putBody["sha"] = existingSha;
  }

  const putRes = await fetch(
    `https://api.github.com/repos/${owner.trim()}/${repo.trim()}/contents/${cleanPath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "User-Agent": "BlogIt-App",
      },
      body: JSON.stringify(putBody),
    }
  );

  const putData = await putRes.json();
  if (!putRes.ok) {
    throw new Error(putData.message || "Failed to commit blog post to GitHub repository.");
  }

  // Save GitHub publish configuration in MongoDB
  await GithubPublishConfig.findOneAndUpdate(
    { user: userId, blog: blogId },
    { settings: githubForm },
    { upsert: true, new: true }
  );

  // Update blog publish status
  if (!blog.published.includes("github")) {
    blog.published.push("github");
  }
  blog.status = "published";
  await blog.save();

  return {
    platform: "github",
    success: true,
    message: `Successfully committed to ${owner}/${repo} on branch '${cleanBranch}'!`,
  };
}
