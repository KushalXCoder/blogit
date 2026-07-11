import { create } from 'zustand';
import { UserData } from '../lib/types/user.types';

const initialState = {
    username: '',
    email: '',
    image: '',
    connections: [],
    loading: true,
};

type UserStoreType = Omit<UserData, "_id"> & {
    loading: boolean;
    setUser: (user: UserData) => void;
    setValue: (key: keyof UserData, value: any) => void;
    setLoading: (hydration: boolean) => void;
    reset: () => void;
};

export const userStore = create<UserStoreType>((set) => ({
    ...initialState,
    
    setUser: (user: UserData) => set(user),
    setLoading: (loading: boolean) => set({ loading }),
    setValue: (key: keyof UserData, value: any) => set((prev) => 
        ({ 
            ...prev, 
            [key]: value 
        }),
    ),
    reset: () => set(initialState),
}));