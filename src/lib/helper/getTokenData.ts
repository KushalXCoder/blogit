// Recieves an object and returns the token data that to be stored in the cookie, helping in
// keeping a consistent and central structure for the token data across the application.

import { UserData } from "../types/user.types";
import { TokenData } from "../types/global.types"

type User = UserData & {
    password: string;
};

export const getTokenData = (user: User) : TokenData => {
    return {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        image: user.image ?? '',
        connections: {
            devto: user.connections.devto ?? false,
            hashnode: user.connections.hashnode ?? false
        },
    }
}