import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteBlog } from "@/services/blog.service";
import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "./loader";

type DeleteBoxProps = {
    blogId: string;
};

export function DeleteBox({
    blogId
}: DeleteBoxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMsg("");
    setText(val);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
        await deleteBlog(blogId);
        // Reset states
        setText("");
        // Refresh the whole page 
        router.refresh();
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        toast.error(error instanceof Error ? error.message : "Error deleting blog");
    } finally {
      setLoading(false);
      toast.success("Blog deleted successfully");
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset input when dialog closes
      setText("");
      setMsg("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <HugeiconsIcon icon={Trash2} className="size-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-heading">Delete</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold">Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog? It will permanently remove the
            content from our platform.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="confirmation">
              Please type "Delete my blog" below to confirm.
            </Label>
            <Input
              id="confirmation"
              placeholder="Type Here"
              value={text}
              onChange={(e) => handleChange(e)}
              required
              disabled={loading}
            />
          </div>
          {msg && <p className="text-sm text-destructive/80">{msg}</p>}
        </div>
        <DialogFooter className="sm:justify-start">
            <Button
                onClick={handleDelete}
                disabled={text.trim() !== "Delete my blog" || loading}
            >
                {loading && <Loader />}
                Delete
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}