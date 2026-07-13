import { PublishPage } from "@/components/app-components/publish/publish-page";
import { UserBlogData } from "@/lib/types/blog.types";
import { getBlog } from "@/services/blog.service";
import { cookies } from "next/headers";

type PublishPageParams = {
  params: Promise<{ blogId: string }>;
};

const Publish = async ({ params }: PublishPageParams) => {
  const { blogId } = await params;

  let blogData: UserBlogData | undefined;

  try {
    const token = (await cookies()).get("blogit-token")?.value;
    blogData = await getBlog(blogId, token);
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  if (!blogData) {
    return (
      <div className="container max-w-7xl mx-auto bg-accent/20 flex justify-center items-center">
        <h1>Blog data not found</h1>
      </div>
    );
  }

  return <PublishPage data={blogData} />;
};

export default Publish;
