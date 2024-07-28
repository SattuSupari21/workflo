import HeaderItems from "@/components/HeaderItems";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 bg-zinc-100 pt-6 px-4">
      <HeaderItems />
      <Navbar />
    </div>
  );
}
