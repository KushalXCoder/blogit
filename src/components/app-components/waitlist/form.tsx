"use client";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { addUserToWaitlist } from "@/src/controllers/user.controller";
import { WaitlistData } from "@/src/lib/types/global.types";
import { useState } from "react";
import { toast } from "sonner";

export const WaitlistForm = () => {

    const [data, setData] = useState<WaitlistData>({
        name: "",
        email: "",
        receiveUpdates: false,
    });

    const handleChecked = () => {
        setData(prev => ({
            ...prev,
            receiveUpdates: !prev.receiveUpdates,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email } = data;
        if(!name || !email) return;

        // Handle waitlist logic here
        try {
            await addUserToWaitlist(data);
            toast("Successfully joined the waitlist!");
        } catch (error) {
            toast(error instanceof Error ? error.message : "Failed to join waitlist. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="John Doe"
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
              <div className="flex items-start gap-3 group">
                <Checkbox className="mt-1" checked={data.receiveUpdates} onCheckedChange={handleChecked} />
                <p className="text-gray-500 group-hover:text-black/80 transition-colors">Check this box to receive updates and announcements about blogit.</p>
              </div>
              <Button type="submit">
                Join Waitlist
              </Button>
            </FieldGroup>
        </form>
    )
}