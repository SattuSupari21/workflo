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

export async function registerUser(
  email: string,
  password: string,
  username: string,
) {
  const res = await axios.post(
    process.env.api + "/auth/registerUser",
    { email, password, username },
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
  if (res.status === 201) {
    const data = await res.data;
    cookies().set("token", data.token);
    redirect("/dashboard");
  }
}

export async function logoutUser() {
  cookies().delete("token");
  redirect("/auth/login");
}

export async function createNewTask(
  title: string,
  status: string,
  priority: string,
  deadline: Date | undefined,
  description: string,
) {
  try {
    const res = await axios.post(
      process.env.api + "/task/createTask",
      { title, status, priority, deadline, description },
      {
        headers: {
          "content-type": "application/json",
          Authorization: cookies().get("token")?.value,
        },
      },
    );

    if (res.status === 201) {
      redirect("/dashboard");
    }
  } catch (error) {
    redirect("/dashboard");
  }
}
