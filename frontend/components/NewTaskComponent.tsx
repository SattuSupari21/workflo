import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

export function NewTaskComponent({ label }: { label: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full bg-violet-800 hover:bg-violet-900">
          {label}
          <CirclePlus className="w-5 h-5 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
