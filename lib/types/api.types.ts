import { NextResponse } from "next/server";

export type ApiResponse<T> = {
    message: string;
    data?: T;
    error?: string;
}