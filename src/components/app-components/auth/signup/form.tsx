"use client";

import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { signin } from "@/src/controllers/auth.controller";
import { SignUpData } from "@/src/lib/types/global.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const Form = () => {
    const router = useRouter();

    const [data, setData] = useState<SignUpData>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { username, email, password } = data;
        if(!username || !email || !password) return;

        console.log("Signup data:", data);

        // Handle signup logic here
        try {
          await signin(data);
          toast("Signup successful!");
          router.push("/");
        } catch (error) {
          toast(error instanceof Error ? error.message : "Signup failed. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={data.password} onChange={handleChange} required />
              </Field>
              <Field>
                <Button type="submit">Signup</Button>
                <Button variant="outline" type="button">
                  Signup with Google
                </Button>
                <FieldDescription className="text-center">
                    Already have an account? <Link href="/auth/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
        </form>
    )
}