"use client";

import React, { createContext, useState } from "react";

// @ts-ignore
export const TaskContext = createContext();

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState();

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
