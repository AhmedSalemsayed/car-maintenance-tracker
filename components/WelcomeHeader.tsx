import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function WelcomeHeader() {
  const { firstName } = await currentUser();
  return (
    <h1 className="flex justify-center items-center font-bold text-lg ml-4 text-[#9c27b0]">
      Welcome back , {firstName}!
    </h1>
  );
}
