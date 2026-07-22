import { create } from "zustand";
import { initialFormStateCreators } from "@/hooks/use-form-state";
import { UserBlogData } from "@/lib/types/blog.types";
import { PlatformFormStates } from "@/lib/types/platform.types";

interface FormStoreState {
    blogId: string | null;
    forms: { [P in keyof PlatformFormStates]?: PlatformFormStates[P] };
    setForm: <P extends keyof PlatformFormStates>(
        platform: P,
        update: PlatformFormStates[P] | ((prev: PlatformFormStates[P]) => PlatformFormStates[P])
    ) => void;
    initialize: (data: UserBlogData) => void;
}

// Generic Zustand Store
export const useFormStore = create<FormStoreState>((set) => ({
    blogId: null,
    forms: {},
    setForm: <P extends keyof PlatformFormStates>(
        platform: P,
        update: PlatformFormStates[P] | ((prev: PlatformFormStates[P]) => PlatformFormStates[P])
    ) => set((state) => {
        const current = state.forms[platform];
        if (!current) return {};
        const next = typeof update === "function"
            ? (update as (prev: PlatformFormStates[P]) => PlatformFormStates[P])(current)
            : update;
        return {
            forms: {
                ...state.forms,
                [platform]: next,
            }
        };
    }),
    initialize: (data) => set((state) => {
        if (state.blogId === data._id && Object.keys(state.forms).length > 0) return {};

        const forms: FormStoreState["forms"] = {};
        for (const key in initialFormStateCreators) {
            const k = key as keyof PlatformFormStates;
            forms[k] = initialFormStateCreators[k](data) as never;
        }

        return {
            blogId: data._id,
            forms,
        };
    }),
}));