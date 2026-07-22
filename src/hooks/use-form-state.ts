"use client";

import { UserBlogData } from "@/lib/types/blog.types";
import { DevToFormState, HashnodeFormState, PlatformFormStates } from "@/lib/types/platform.types";
import { useFormStore } from "@/store/form.store";
import React from "react";

// Templates for initial form values
export const initialFormStateCreators: {
    [P in keyof PlatformFormStates]: (data: UserBlogData) => PlatformFormStates[P];
} = {
    devto: (data) => ({
        title: data.title,
        body_markdown: data.content,
        published: true,
        tagStream: "",
        tags: [],
        main_image: data.coverImage,
        description: "",
        canonical_url: "",
        series: "",
        organization_id: "",
    }),
    hashnode: (data) => ({
        title: data.title,
        markdown: data.content,
        publication_id: "",
        slug: "",
        subtitle: "",
        cover_image: data.coverImage,
        tags: "",
        series: "",
        seo_title: "",
        seo_description: "",
        canonical_url: "",
        disable_comments: false,
        hide_from_feed: false,
        draft: false,
    }),
};

export const useFormState = (data: UserBlogData) => {
    const store = useFormStore();

    React.useEffect(() => {
        store.initialize(data);
    }, [data]);

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