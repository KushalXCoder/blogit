import { create } from 'zustand';

type SettingsStore = {
    username: string;
    email: string;
    hasImageSelected: boolean;
    image: string;
    devtoKey: string;
    hashnodeKey: string;

    updateSettings: (settings: Partial<SettingsStore>) => void;
}

export const settingsStore = create<SettingsStore>((set) => ({
    username: '',
    email: '',
    hasImageSelected: false,
    image: '',
    devtoKey: '',
    hashnodeKey: '',
    updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));