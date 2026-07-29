"use client";

import { UserBlogData } from "@/lib/types/blog.types";
import { DevToFormState, PlatformFormStates } from "@/lib/types/platform.types";
import { useFormStore } from "@/store/form.store";
import React from "react";

// Templates for initial form values
export const initialFormStateCreators: {
    [P in keyof PlatformFormStates]: (data: UserBlogData) => PlatformFormStates[P];
} = {
    devto: (data) => ({
        title: data.title || "",
        body_markdown: data.content || "",
        published: true,
        tagStream: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        tags: data.tags || [],
        main_image: data.coverImage || "",
        description: "",
        canonical_url: "",
        series: "",
        organization_id: "",
    }),
    github: (data) => {
        // Derive clean slug for default filename: e.g. "my-first-blog.md"
        const slug = (data.title || "untitled")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        return {
            title: data.title || "",
            content: data.content || "",
            owner: "",
            repo: "",
            branch: "main",
            filePath: `content/posts/${slug || "post"}.md`,
            commitMessage: `feat(blog): publish post "${data.title || "Untitled"}"`,
            customFields: [],
        };
    },
};

import { fetchSavedPublishConfigs } from "@/services/client/publish.client";

export const useFormState = (data: UserBlogData) => {
    const store = useFormStore();

    React.useEffect(() => {
        if (!data || !data._id) return;
        store.initialize(data);

        let isMounted = true;
        fetchSavedPublishConfigs(data._id)
            .then((configs) => {
                if (isMounted && configs) {
                    store.hydrateSavedConfigs(configs as Record<string, unknown>);
                }
            })
            .catch((err) => console.error("Failed to load saved publish configs:", err));

        return () => {
            isMounted = false;
        };
    }, [data?._id]);

    const getForm = <P extends keyof PlatformFormStates>(platform: P): PlatformFormStates[P] => {
        return (store.forms[platform] || initialFormStateCreators[platform](data)) as PlatformFormStates[P];
    };

    const setForm = <P extends keyof PlatformFormStates>(
        platform: P,
        update: PlatformFormStates[P] | ((prev: PlatformFormStates[P]) => PlatformFormStates[P])
    ) => {
        store.setForm(platform, update);
    };

    return {
        forms: store.forms,
        getForm,
        setForm,
    };
};  