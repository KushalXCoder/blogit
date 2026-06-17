import { OtpInput } from "@/src/components/app-components/auth/otp";

const OtpPage = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl">Enter OTP</h1>
                <p className="text-gray-500 text-lg">An otp has been sent to the email, that you provided.</p>
                <OtpInput />
            </div>
        </div>

    )
}

export default OtpPage;