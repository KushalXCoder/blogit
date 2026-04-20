export type LoginData = {
    email: string;
    password: string;
};

export type SignUpData = LoginData & {
    username: string;
};

export type WaitlistData = {
    name: string;
    email: string;
    receiveUpdates: boolean;
}