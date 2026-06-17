"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useEffect, useRef, useState } from "react";

export const OtpInput = () => {
    const [currPos, setCurrPos] = useState<number>(0);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value.slice(0,1);
        if(!val) return;

        setOtp(prev => {
            const newOtp = [...prev];
            newOtp[index] = val;
            return newOtp;
        });

        if(index !== 5) {
            setCurrPos(index + 1);
            inputsRef.current[index + 1]?.focus();
        }
    }

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                setOtp(prev => {
                    const newOtp = [...prev];
                    newOtp[index] = "";
                    return newOtp;
                });
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();

                setOtp(prev => {
                    const newOtp = [...prev];
                    newOtp[index - 1] = "";
                    return newOtp;
                });
            }
        }
    }

    const handleVerify = () => {
        console.log(otp.join(""));
    }

    return (
        <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-2 mt-5">
                {Array.from({ length: 6 }).map((_,i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Input
                            ref={(el) => {(inputsRef.current[i] = el)}}
                            type="number"
                            value={otp[i]}
                            className="size-10 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleBackspace(e, i)}
                        />
                        {i !== 5 && <span className="text-lg">-</span>}
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start gap-3">
                <p className="text-gray-500">Didn't receive the code? <button className="text-blue-500 underline">Resend</button></p>
                <Button
                    className="min-w-40 py-4"
                    onClick={handleVerify}
                >
                    Verify
                </Button>
            </div>
        </div>
    )
}