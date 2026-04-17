"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginData } from "@/lib/types/global.types";
import Link from "next/link";
import { useState } from "react";

export const Form = () => {
    const [data, setData] = useState<LoginData>({
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        // Store to backend
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
                  placeholder="johndoe"
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
                <Button type="submit">Sign Up</Button>
                <Button variant="outline" type="button">
                  Sign Up with Google
                </Button>
                <FieldDescription className="text-center">
                    Already have an account? <Link href="/auth/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
        </form>
    )
}