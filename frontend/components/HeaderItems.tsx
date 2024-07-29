import { CircleHelp } from "lucide-react";
import Image from "next/image";

type HeaderItemType = {
  id: number;
  image: string;
  title: string;
  desc: string;
};

const headerItems: HeaderItemType[] = [
  {
    id: 1,
    image: "one.png",
    title: "Introducing tags",
    desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    id: 2,
    image: "two.png",
    title: "Share Notes Instantly",
    desc: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    id: 3,
    image: "three.png",
    title: "Access Anywhere",
    desc: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

export default function HeaderItems() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-5xl font-bold">Good morning, Joe!</span>
        <span className="flex gap-2">
          Help & feedback <CircleHelp />
        </span>
      </div>
      <div className="flex gap-4 mt-6">
        {headerItems.map((item) => {
          return (
            <div className="flex bg-white rounded-md p-6" key={item.id}>
              <div className="w-[180px] h-auto flex items-center">
                <Image
                  src={"/" + item.image}
                  width={500}
                  height={500}
                  alt={item.image}
                />
              </div>
              <div className="flex flex-col px-6 gap-1">
                <span className="text-zinc-500 font-semibold">
                  {item.title}
                </span>
                <span className="text-zinc-500 text-sm">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
