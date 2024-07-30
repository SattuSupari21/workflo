import {
  Calendar,
  CirclePlus,
  Filter,
  Loader,
  Pencil,
  Search,
  Share2,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between relative">
        <Input type="text" placeholder="Search" />
        <Search className="absolute right-2 text-zinc-400" />
      </div>
      <div className="flex gap-2">
        <Button variant={"outline"}>
          Calender View <Calendar className="ml-2" />
        </Button>
        <Button variant={"outline"}>
          Automation <Sparkles className="ml-2" />
        </Button>
        <Button variant={"outline"}>
          Filter <Filter className="ml-2" />
        </Button>
        <Button variant={"outline"}>
          Share <Share2 className="ml-2" />
        </Button>
        <CreateNewTaskDialog />
      </div>
    </div>
  );
}

function CreateNewTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center p-2 text-white rounded-md bg-violet-800 hover:bg-violet-900 shadow-lg">
        Create new
        <CirclePlus className="w-5 h-5 ml-2" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 text-zinc-700">
        <Input
          type="text"
          placeholder="Title"
          className="text-4xl p-0 border-0 mt-6"
        />
        <div className="flex gap-4 items-center">
          <Loader className="w-5 h-5 " />
          Status
        </div>
        <div className="flex gap-4 items-center">
          <TriangleAlert />
          Priority
        </div>
        <div className="flex gap-4 items-center">
          <Calendar />
          Deadline
        </div>
        <div className="flex gap-4 items-center">
          <Pencil />
          Desciption
        </div>
      </DialogContent>
    </Dialog>
  );
}
