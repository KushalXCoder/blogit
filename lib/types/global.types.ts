export type LoginData = {
    email: string;
    password: string;
};

export type SignUpData = LoginData & {
    username: string;
};