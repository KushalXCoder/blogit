import { LoginForm } from "@/components/app-components/auth/login/login";

const Login = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;