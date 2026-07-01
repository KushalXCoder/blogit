import { AuthBoxInfo } from "@/components/app-components/auth/auth-box-info";
import { LoginForm } from "@/components/app-components/auth/login/login";
import { BackgroundPattern } from "@/components/app-components/background-pattern";
import { Logo } from "@/components/app-components/logo";

const Login = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden bg-background text-foreground font-sans select-none">
      <BackgroundPattern />
      <div className="w-full max-w-4xl bg-card border border-border shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden flex flex-row min-h-[550px] relative z-10 m-4">
        <AuthBoxInfo />
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-card relative">
          <div className="absolute top-6 left-8 md:hidden z-20">
            <Logo />
          </div>
          <LoginForm className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;