import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { WaitlistForm } from "./form";
import { checkWaitlist } from "@/src/lib/helper/checkWaitlist";

export const WaitlistDialog = async () => {
    const isUserInWaitlist = await checkWaitlist();
    return (
        <Dialog>
            <DialogTrigger className="w-50 border py-2 rounded-md hover:bg-accent transition-colors">
                Join Waitlist
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thanks for joining the waitlist!</DialogTitle>
                    {!isUserInWaitlist && (
                        <DialogDescription>
                            Please enter the details below and we'll notify you when we're ready to launch. We appreciate your interest and can't wait to share blogit with you!
                        </DialogDescription>
                    )}
                </DialogHeader>
                {isUserInWaitlist ? (
                    <div className="text-blue-500">You are already on the waitlist! Please wait for our notification. Thanks for choosing blogit!</div>
                ) : (
                    <WaitlistForm />
                )}
            </DialogContent>
        </Dialog>
    )
}