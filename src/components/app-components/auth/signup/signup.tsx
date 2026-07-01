import { cn } from "@/lib/utils";
import { Form } from "./form";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight">Create an account</h3>
        <p className="text-sm text-muted-foreground mt-1.5">
          Enter your details below to set up your workspace
        </p>
      </div>
      <Form />
    </div>
  );
}