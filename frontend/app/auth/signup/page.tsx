"use client";

import { registerUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Signup() {
  // @ts-ignore
  const { setName } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [showError, setShowError] = useState(false);

  const router = useRouter();

  async function handleRegister() {
    try {
      const name = await registerUser(email!, password!, username!);
      setName(name);
      setShowError(false);
      router.push("/");
    } catch (e) {
      setShowError(true);
    }
  }
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Your email"
          className="bg-zinc-100 focus:border-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          className="bg-zinc-100 focus:border-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="bg-violet-400 shadow-xl hover:bg-violet-500"
          onClick={handleRegister}
        >
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
