"use client";

import {
  ArrowDownToLine,
  BellDot,
  ChartSpline,
  ChevronsRight,
  CirclePlus,
  House,
  Loader,
  Settings,
  SquareKanban,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { logoutUser } from "@/app/actions";
import { NewTaskComponent } from "./NewTaskComponent";
import CreateNewTaskDialog from "./CreateNewTaskDialog";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function Sidebar() {
  // @ts-ignore
  const { name } = useContext(UserContext);

  return (
    <div className="w-[285px] h-screen fixed flex flex-col gap-4 border-r-2 p-4">
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 bg-zinc-200 rounded-md"></div>
        <span className="text-lg font-medium">{name}</span>
      </div>

      <div className="flex items-center justify-between text-zinc-500">
        <div className="flex gap-4">
          <BellDot className="w-5 h-5 " />
          <Loader className="w-5 h-5 " />
          <ChevronsRight className="w-5 h-5 " />
        </div>
        <Button
          className="text-sm h-8 px-2"
          variant={"outline"}
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
      </div>

      <div className="flex flex-col gap-1 text-zinc-500">
        <Button
          className="text-md h-8 px-2 justify-start gap-2"
          variant={"ghost"}
        >
          <House className="w-5 h-5" />
          Home
        </Button>
        <Button
          className="text-md h-8 px-2 justify-start gap-2"
          variant={"ghost"}
        >
          <SquareKanban className="w-5 h-5" />
          Boards
        </Button>
        <Button
          className="text-md h-8 px-2 justify-start gap-2"
          variant={"ghost"}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Button>
        <Button
          className="text-md h-8 px-2 justify-start gap-2"
          variant={"ghost"}
        >
          <Users className="w-5 h-5" />
          Teams
        </Button>
        <Button
          className="text-md h-8 px-2 justify-start gap-2"
          variant={"ghost"}
        >
          <ChartSpline className="w-5 h-5" />
          Analytics
        </Button>
      </div>

      <CreateNewTaskDialog label="Create new task" />

      <Button className="bg-zinc-200 hover:bg-zinc-300 text-zinc-500 flex items-center justify-between py-6 gap-2 mt-auto">
        <ArrowDownToLine />
        <div className="flex flex-col text-start">
          <span className="text-lg">Download the App</span>
          <span className="text-xs">Get the full experience</span>
        </div>
      </Button>
    </div>
  );
}
