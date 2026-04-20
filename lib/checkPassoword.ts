"use server";

import bcrypt from "bcrypt";

// Function to check if the provided password matches the hashed password
export const checkPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}