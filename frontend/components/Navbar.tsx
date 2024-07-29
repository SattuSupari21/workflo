import {
  Calendar,
  CirclePlus,
  Filter,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
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
        <Button className="bg-violet-800 hover:bg-violet-900 shadow-lg">
          Create new
          <CirclePlus className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
