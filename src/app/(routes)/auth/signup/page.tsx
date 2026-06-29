import { SignupForm } from "@/components/app-components/auth/signup/signup";
import { BackgroundPattern } from "@/components/app-components/background-pattern";

const Signup = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <BackgroundPattern />
            <div className="relative w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup;