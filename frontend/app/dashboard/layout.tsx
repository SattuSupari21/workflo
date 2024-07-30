"use client";

import Sidebar from "@/components/Sidebar";
import { TaskContext, TaskProvider } from "@/context/taskContext";
import { useContext, useEffect } from "react";
import { getAllTasks } from "../actions";
import { UserProvider } from "@/context/userContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // @ts-ignore
  const { tasks, setTasks } = useContext(TaskContext);

  type Response = {
    tasks: [{}];
  };

  async function getTasks() {
    // @ts-ignore
    const res: Response = await getAllTasks();
    setTasks(res.tasks);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
