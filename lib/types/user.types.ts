export type UserSettings = {
    username: string;
    email: string;
    profileImage: string;
    devtoKey?: string;
    hashnodeKey?: string;
};

export type TokenData = {
    user: User;
};

export type User = {
    username: string;
    email: string;
}