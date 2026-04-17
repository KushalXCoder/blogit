export type SignUpData = {
    email: string;
    password: string;
};

export type LoginData = SignUpData & {
    username: string;
};