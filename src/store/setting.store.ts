import { create } from 'zustand';

type SettingsStore = {
    hasImageSelected: boolean;
    image: string;
    devtoKey: string;
    githubKey: string;

    updateSettings: (settings: Partial<SettingsStore>) => void;
}

export const settingsStore = create<SettingsStore>((set) => ({
    hasImageSelected: false,
    image: '',
    devtoKey: '',
    githubKey: '',
    updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));