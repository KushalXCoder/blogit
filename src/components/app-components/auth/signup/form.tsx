"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signin } from "@/services/auth.service";
import { SignUpData } from "@/lib/types/auth.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { userStore } from "@/store/user.store";
import { getUserData } from "@/services/user.service";
import { redirectTo } from "@/app/actions";

export const Form = () => {
    const router = useRouter();
    const { setUser } = userStore();

    const [loading, setLoading] = useState(false);
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

        setLoading(true);
        // Handle signup logic here
        try {
          await signin(data);
          toast("Signup successful!");

          // Fetch user data and update store client-side immediately
          const userData = await getUserData();
          if (userData) setUser(userData);

          // Redirect to dashboard using Server Action (which purges router cache)
          await redirectTo("/dashboard");
        } catch (error) {
          // Ignore Next.js redirect errors as they are expected when performing server-side redirect
          if (error instanceof Error && (error.message === "NEXT_REDIRECT" || error.message.includes("NEXT_REDIRECT"))) return;
          toast(error instanceof Error ? error.message : "Signup failed. Please try again.");
          setLoading(false);
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
                  disabled={loading}
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
                  disabled={loading}
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
                <Input id="password" type="password" value={data.password} onChange={handleChange} required disabled={loading} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full justify-center">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />}
                  Signup
                </Button>
                <Button variant="outline" type="button" disabled={loading} className="w-full justify-center">
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