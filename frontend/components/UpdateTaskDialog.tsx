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
import { createNewTask, updateTask } from "@/app/actions";
import { TaskContext } from "@/context/taskContext";

type TaskType = {
    id: number;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: Date;
  };

export default function UpdateTaskDialog({task}: {task: TaskType}) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description ? task.description : "");
  const [status, setStatus] = useState<string>(task.status);
  const [priority, setPriority] = useState<string>(task.priority ? task.priority : "");
  const [date, setDate] = useState<Date | undefined>(task.deadline ? new Date(task.deadline) : undefined);

  const [open, setOpen] = useState(false);

  // @ts-ignore
  const { tasks, setTasks } = useContext(TaskContext);

  async function handleUpdateTask() {
    const valid = validateNewTaskType({
        title,
        status,
        priority,
        deadline: date,
        description,
    });
    if (valid.success) {
        const updatedTask = await updateTask(
            task.id,
            title!,
            status!,
            priority!,
            date!,
            description!,
        );
        setOpen(false);
        setTasks(tasks.map((t: TaskType) => t.id === task.id ? {...updatedTask} : t ))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-10 h-10 text-center border rounded-md bg-white hover:bg-yellow-500 hover:text-white active:bg-yellow-600'>
        <Pencil className="w-full h-5" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 text-zinc-700">
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="select-none text-4xl p-0 border-0 mt-6 focus:outline-none font-semibold text-zinc-500"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-sm flex flex-col gap-3 text-zinc-500">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <Loader className="w-5 h-5" />
              Status
            </div>
            <Select onValueChange={(value) => setStatus(value)} value={status}>
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
            <Select onValueChange={(value) => setPriority(value)} value={priority}>
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
              value={description}
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
        <Button onClick={() => handleUpdateTask()}>Update task</Button>
      </DialogContent>
    </Dialog>
  );
}
