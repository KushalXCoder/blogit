import { create } from 'zustand';
import { UserData } from '../lib/types/user.types';

type UserStoreType = UserData & {
    loading: boolean;
    setUser: (user: UserData) => void;
    setValue: (key: keyof UserData, value: any) => void;
    setLoading: (hydration: boolean) => void;
};

export const userStore = create<UserStoreType>((set) => ({
    username: '',
    email: '',
    image: '',
    connections: {
        devto: false,
        hashnode: false,
    },
    loading: true,
    
    setUser: (user: UserData) => set(user),
    setLoading: (loading: boolean) => set({ loading }),
    setValue: (key: keyof UserData, value: any) => set((prev) => 
        ({ 
            ...prev, 
            [key]: value 
        }),
    ),
}));