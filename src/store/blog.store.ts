import { create } from "zustand";

type BlogStoreType = {
    title: string;
    coverImage: string;
    content: string;
    words: number;
    readingTime: number;

    setDetails: (details: Partial<BlogStoreType>) => void;
    setWords: (words: number) => void;
    setReadingTime: (readingTime: number) => void;
}

export const BlogStore = create<BlogStoreType>((set) => ({
    title: "",
    coverImage: "",
    words: 0,
    readingTime: 0,
    content: "",

    setDetails: (details) => set(details),
    setWords: (words) => set({ words }),
    setReadingTime: (readingTime) => set({ readingTime }),
}));