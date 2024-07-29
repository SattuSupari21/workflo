import HeaderItems from "@/components/HeaderItems";
import MainBody from "@/components/MainBody";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen ml-[285px] flex flex-col gap-4 bg-zinc-100 p-4 pt-6">
      <HeaderItems />
      <Navbar />
      <MainBody />
    </div>
  );
}
