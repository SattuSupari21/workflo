"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export async function loginUser(email: string, password: string) {
  const res = await axios.post(
    process.env.api + "/auth/loginUser",
    { email, password },
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
  if (res.status === 200) {
    const data = await res.data;
    cookies().set("token", data);
    redirect("/dashboard");
  }
}

export async function logoutUser() {
  cookies().set("token", "");
}
