// All the blog related controllers will be here

export const saveDraft = async ({
    title,
    coverImage,
    content,
    words
} : BlogData) => {
    const res = await fetch("/api/blog/save-draft", {
        method: "POST",
        body: JSON.stringify({ title, coverImage, content, words }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if(!res.ok) {
        console.log(res);
        throw new Error(data.message || "Failed to save draft");
    }

    return data;
}