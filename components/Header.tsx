import React from "react";
import Notifications from "./Notifications";
import WelcomeHeader from "./WelcomeHeader";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DarkModeBtn from "./DarkModeBtn";

export default function Header() {
  return (
    <header className="bg-white w-full gap-2 mt-2 dark:bg-[#1e1e1e] p-1 justify-between shadow-md rounded-sm hidden md:flex">
      <WelcomeHeader />
      <div className="flex gap-2">
        <div className="flex gap-1 text-xs items-center cursor-pointer">
          <Notifications />
          <DarkModeBtn />
        </div>
        <div className="h-[80%] w-[1px] mt-[3px] bg-slate-200 dark:bg-[#e2e2e2]" />
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <div className="flex justify-center items-center gap-2">
          
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div> */}
      </div>
    </header>
  );
}
