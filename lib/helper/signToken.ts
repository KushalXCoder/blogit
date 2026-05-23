import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}

// Function to sign a token with the given payload
export const signToken = (
    payload: any,
    expiresIn: string = "7d"
) => {
    // Remove exp from payload if it exists, as we will set it in the options
    const { exp, ...rest } = payload;
    const token = jwt.sign(
        rest,
        JWT_SECRET,
        { expiresIn } as jwt.SignOptions,
    );
    return token;
}