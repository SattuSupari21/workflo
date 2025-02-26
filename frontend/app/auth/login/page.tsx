"use client";

import { loginUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {
  // @ts-ignore
  const { setName } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    try {
      const username = await loginUser(email!, password!);
      setName(username);
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
          placeholder="Your email"
          className="bg-zinc-100 focus:border-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          className="bg-zinc-100 focus:border-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError && (
          <span className="text-red-500 text-center">
            Invalid Email or Password!
          </span>
        )}
        <Button
          className="bg-violet-400 shadow-xl hover:bg-violet-500"
          onClick={handleLogin}
        >
          Login
        </Button>
        <span className="m-auto text-zinc-500">
          Dont have an account? Create a
          <Link href={"/auth/signup"} className="text-blue-600">
            new account
          </Link>
          .
        </span>
      </div>
    </main>
  );
}
