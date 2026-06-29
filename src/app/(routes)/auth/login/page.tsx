import { LoginForm } from "@/components/app-components/auth/login/login";
import { BackgroundPattern } from "@/components/app-components/background-pattern";

const Login = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <BackgroundPattern />
            <div className="relative w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;