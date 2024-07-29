"use client";

import { useRef, useState } from "react";
import { Clock3, ListFilter, Plus } from "lucide-react";
import { Button } from "./ui/button";

type TaskType = {
  id: number;
  title: string;
  desc: string;
  status: string;
  priority: string;
  deadline: string;
};

export default function MainBody() {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      title: "temp 1",
      desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
      status: "To do",
      priority: "Urgent",
      deadline: "2024-07-28T09:09:30.904+00:00",
    },
    {
      id: 2,
      title: "temp 2",
      desc: "temp 2 desc",
      status: "To do",
      priority: "Low",
      deadline: "2024-07-28T09:09:30.904+00:00",
    },
    {
      id: 3,
      title: "temp 3",
      desc: "temp 3 desc",
      status: "Under review",
      priority: "Urgent",
      deadline: "2024-07-28T09:09:30.904+00:00",
    },
    {
      id: 4,
      title: "temp 4",
      desc: "temp 4 desc",
      status: "In progress",
      priority: "Medium",
      deadline: "2024-07-28T09:09:30.904+00:00",
    },
  ]);

  const TaskStatus = ["To do", "In progress", "Under review", "Finished"];

  const todoArr = tasks.filter((item) => item.status === "To do");

  const dragItem = useRef<number>();
  const dragOverItem = useRef<number>();

  const [active, setActive] = useState(false);

  function handleOnDrag(e: React.DragEvent, item: TaskType) {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }

  function handleOnDrop(e: React.DragEvent) {
    const item = JSON.parse(e.dataTransfer.getData("item"));
    // @ts-ignore
    if (e.target.id) {
      setTasks(
        tasks.map((task) =>
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

  function RenderTasks({ status }: { status: string }) {
    return (
      <div
        id={status}
        className={`h-full pb-4 flex flex-col gap-4 rounded-lg`}
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {tasks
          .filter((task) => task.status === status)
          .map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 border bg-zinc-100 rounded-lg"
                draggable={true}
                onDragStart={(e) => handleOnDrag(e, item)}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-sm text-balance">{item.desc}</span>
                </div>
                <span
                  className={`p-2 ${getPriorityColor(item.priority)} mr-auto text-white text-sm rounded-xl`}
                >
                  {item.priority}
                </span>
                <div className="flex gap-2 text-sm font-semibold items-center">
                  <Clock3 />
                  <span>{new Date(item.deadline).toDateString()}</span>
                </div>
              </div>
            );
          })}
        <Button className="shadow-lg">
          Add new
          <Plus className="w-5 h-5 ml-auto" />
        </Button>
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
