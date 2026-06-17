import { SignupForm } from "@/src/components/app-components/auth/signup/signup";


const Signup = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup;