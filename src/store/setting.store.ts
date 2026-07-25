import { create } from 'zustand';

type SettingsStore = {
    hasImageSelected: boolean;
    image: string;
    devtoKey: string;

    updateSettings: (settings: Partial<SettingsStore>) => void;
}

export const settingsStore = create<SettingsStore>((set) => ({
    hasImageSelected: false,
    image: '',
    devtoKey: '',
    updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));