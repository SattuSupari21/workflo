import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex w-screen h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-violet-400">
      <div className="flex flex-col gap-4 bg-white border-2 p-12 mt-24 rounded-xl">
        <span className="text-4xl font-medium px-8 mb-2">
          Welcome to <span className="text-purple-900">Workflo</span>!
        </span>
        <Input
          type="text"
          placeholder="Full name"
          className="bg-zinc-100 focus:border-none"
        />
        <Input
          placeholder="Your email"
          className="bg-zinc-100 focus:border-none"
        />
        <Input
          placeholder="Password"
          className="bg-zinc-100 focus:border-none"
        />
        <Button className="bg-violet-400 shadow-xl hover:bg-violet-500">
          Sign up
        </Button>
        <span className="m-auto text-zinc-500">
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-blue-600">
            Log in
          </Link>
          .
        </span>
      </div>
    </main>
  );
}
