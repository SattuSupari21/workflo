"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Clock3, Delete, ListFilter, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { TaskContext } from "@/context/taskContext";
import { deleteTask, getAllTasks } from "@/app/actions";
import CreateNewTaskDialog from "./CreateNewTaskDialog";
import UpdateTaskDialog from "./UpdateTaskDialog";

type TaskType = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: Date;
};

export default function MainBody() {
  // @ts-ignore
  const { tasks, setTasks } = useContext(TaskContext);

  const TaskStatus = ["To do", "In progress", "Under review", "Finished"];

  const [active, setActive] = useState(false);

  function handleOnDrag(e: React.DragEvent, item: TaskType) {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }

  function handleOnDrop(e: React.DragEvent) {
    const item = JSON.parse(e.dataTransfer.getData("item"));
    // @ts-ignore
    if (e.target.id) {
      setTasks(
        tasks.map((task: TaskType) =>
          // @ts-ignore
          task.id === item.id ? { ...task, status: e.target.id } : task,
        ),
      );
    }
  }

  function handleDragOver(e: React.DragEvent) {
    setActive(true);
    e.preventDefault();
  }

  function getPriorityColor(priority: string) {
    if (priority === "Urgent") return "bg-red-400";
    else if (priority === "Medium") return "bg-yellow-400";
    else if (priority === "Low") return "bg-green-400";
  }

  async function handleDelete(id: number) {
    await deleteTask(id).then((response) => {
      if (response === 204) {
        setTasks(
          tasks.map((task: TaskType) => task.id !== id && { ...task }))
      }
    });
  }

  function RenderTasks({ status }: { status: string }) {
    return (
      <div
        id={status}
        className={`h-full pb-4 flex flex-col gap-4 rounded-lg`}
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {tasks &&
          tasks
            .filter((task: TaskType) => task.status === status)
            .map((item: TaskType) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-4 border bg-zinc-100 rounded-lg"
                  draggable={true}
                  onDragStart={(e) => handleOnDrag(e, item)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-sm text-wrap">
                      {item.description}
                    </span>
                  </div>
                  {item.priority && (
                    <span
                      className={`p-2 ${getPriorityColor(item.priority)} mr-auto text-white text-sm rounded-xl`}
                    >
                      {item.priority}
                    </span>
                  )}
                  {item.deadline && (
                    <div className="flex gap-2 text-sm font-semibold items-center">
                      <Clock3 />
                      <span>{new Date(item.deadline).toDateString()}</span>
                    </div>
                  )}
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="hover:bg-red-500 hover:text-white active:bg-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                    <UpdateTaskDialog task={item} />
                  </div>
                </div>
              );
            })}
        <CreateNewTaskDialog label="Add new" statusValue={status}/>
      </div>
    );
  }

  return (
    <div className="flex justify-between bg-white p-4 rounded-lg gap-4">
      {TaskStatus.map((status, index) => (
        <div className="w-full flex flex-col gap-4" key={index}>
          <div className="flex justify-between">
            <span>{status}</span>
            <ListFilter />
          </div>
          <div className="h-full">
            <RenderTasks status={status} />
          </div>
        </div>
      ))}
    </div>
  );
}
