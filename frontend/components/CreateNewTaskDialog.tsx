import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  CirclePlus,
  Loader,
  Pencil,
  Plus,
  TriangleAlert,
} from "lucide-react";
import { Button } from "./ui/button";

import { validateNewTaskType } from "@/types/NewTaskType";
import { createNewTask } from "@/app/actions";
import { TaskContext } from "@/context/taskContext";

export default function CreateNewTaskDialog() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const [open, setOpen] = useState(false);

  // @ts-ignore
  const { setTasks } = useContext(TaskContext);

  async function handleNewTaskCreation() {
    const newTask = await createNewTask(
      title!,
      status!,
      priority!,
      date!,
      description!,
    );
    // @ts-ignore
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
    setStatus("");
    setPriority("");
    setDate(undefined);
  }

  useEffect(() => {
    if (!open) {
      const valid = validateNewTaskType({
        title,
        status,
        priority,
        deadline: date,
        description,
      });
      if (valid.success) {
        handleNewTaskCreation();
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center p-2 text-white rounded-md bg-violet-800 hover:bg-violet-900 shadow-lg">
        Create new
        <CirclePlus className="w-5 h-5 ml-2" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 text-zinc-700">
        <input
          type="text"
          placeholder="Title"
          className="text-4xl p-0 border-0 mt-6 focus:outline-none font-semibold text-zinc-500"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-sm flex flex-col gap-3 text-zinc-500">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <Loader className="w-5 h-5" />
              Status
            </div>
            <Select onValueChange={(value) => setStatus(value)}>
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
            <Select onValueChange={(value) => setPriority(value)}>
              <SelectTrigger className="border-0 max-w-[300px]">
                <SelectValue placeholder="Not selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <CalendarIcon className="w-5 h-5" />
              Deadline
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal border-0 p-3",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? format(date, "PPP") : <span>Not selected</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-5 items-center text-zinc-900 mt-2">
            <Plus className="w-5 h-5" />
            <div>Add custom property</div>
          </div>

          <div className="border-b mt-6 mb-5"></div>

          <div className="pb-[300px]">
            Start writing, or drag your own files here.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
