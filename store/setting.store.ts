import { create } from 'zustand';

type SettingsStore = {
    username: string;
    email: string;
    profileImage: string;
    devtoKey: string;
    hashnodeKey: string;

    updateSettings: (settings: Partial<SettingsStore>) => void;
}

export const settingsStore = create<SettingsStore>((set) => ({
    username: '',
    email: '',
    profileImage: '/avatars/profile.jpg',
    devtoKey: '',
    hashnodeKey: '',
    updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));