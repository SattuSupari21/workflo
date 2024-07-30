"use client";

import React, { createContext, useState } from "react";

// @ts-ignore
export const UserContext = createContext();

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState();

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
