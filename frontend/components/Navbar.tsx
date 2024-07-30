import {
  Calendar,
  CirclePlus,
  Filter,
  Loader,
  Pencil,
  Plus,
  Search,
  Share2,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
        <input
          type="text"
          placeholder="Title"
          className="text-4xl p-0 border-0 mt-6 focus:outline-none font-semibold text-zinc-500"
        />
        <div className="text-sm flex flex-col gap-3 text-zinc-500">

          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <Loader className="w-5 h-5" />
              Status
            </div>
            <Select>
              <SelectTrigger className="border-0 max-w-[300px]">
                <SelectValue placeholder="Not selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In progress">In progress</SelectItem>
                <SelectItem value="Under review">Under review</SelectItem>
                <SelectItem value="Finished">Finished</SelectItem>
              </SelectContent>
          </Select>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <TriangleAlert className="w-5 h-5" />
              Priority
            </div>
            <Select>
              <SelectTrigger className="border-0 max-w-[300px]">
                <SelectValue placeholder="Not selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In progress">In progress</SelectItem>
                <SelectItem value="Under review">Under review</SelectItem>
                <SelectItem value="Finished">Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
            <Calendar className="w-5 h-5" />
            Deadline
            </div>
            <Select>
              <SelectTrigger className="border-0 max-w-[300px]">
                <SelectValue placeholder="Not selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In progress">In progress</SelectItem>
                <SelectItem value="Under review">Under review</SelectItem>
                <SelectItem value="Finished">Finished</SelectItem>
              </SelectContent>
          </Select>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <Pencil className="w-5 h-5" />
              Desciption
            </div>
            <input
              type="text"
              placeholder="Not selected"
              className="min-w-[300px] p-3 border-0 focus:outline-none text-zinc-500"
            />
          </div>

          <div className="flex gap-5 items-center text-zinc-900 mt-2">
            <Plus className="w-5 h-5" />
            <div>Add custom property</div>
          </div>

          <div className="border-b mt-6 mb-5"></div>
          
          <div className="pb-[300px]">Start writing, or drag your own files here.</div>
          
          </div>
      </DialogContent>
    </Dialog>
  );
}
