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

export default function Dashboard() {
  return (
    <div className="bg-zinc-100 pt-6 px-4">
      <span className="text-4xl font-bold">Good morning, Joe!</span>
      <div className="flex gap-4 mt-6">
        {headerItems.map((item) => {
          return (
            <div className="flex bg-white rounded-md p-6" key={item.id}>
              <Image
                src={"/" + item.image}
                width={70}
                height={60}
                alt={item.image}
              />
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
