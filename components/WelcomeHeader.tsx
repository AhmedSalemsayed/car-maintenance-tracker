import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function WelcomeHeader() {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;

  return (
    <h1 className="flex justify-center items-center font-bold text-lg ml-4 text-[#7f55b1] dark:text-[#C497FC]">
      Welcome back , {user.firstName}!
    </h1>
  );
}
