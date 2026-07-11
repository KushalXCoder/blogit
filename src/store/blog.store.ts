import { create } from "zustand";

const initialState = {
    id: "",
    title: "",
    coverImage: "",
    content: "",
    words: 0,
    readingTime: 0,
}

type BlogStoreType = {
    id: string;
    title: string;
    coverImage: string;
    content: string;
    words: number;
    readingTime: number;
    
    setDetails: (details: Partial<BlogStoreType>) => void;
    setWords: (words: number) => void;
    setReadingTime: (readingTime: number) => void;
    reset: () => void;
}

export const blogStore = create<BlogStoreType>((set) => ({
    ...initialState,
    setDetails: (details) => set(details),
    setWords: (words) => set({ words }),
    setReadingTime: (readingTime) => set({ readingTime }),
    reset: () => set(initialState),
}));