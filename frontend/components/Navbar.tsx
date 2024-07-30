"use client";

import {
  Calendar as CalendarIcon,
  Filter,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import CreateNewTaskDialog from "./CreateNewTaskDialog";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between relative">
        <Input type="text" placeholder="Search" />
        <Search className="absolute right-2 text-zinc-400" />
      </div>
      <div className="flex gap-2">
        <Button variant={"outline"}>
          Calender View <CalendarIcon className="ml-2" />
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
        <CreateNewTaskDialog label="Create new" />
      </div>
    </div>
  );
}
