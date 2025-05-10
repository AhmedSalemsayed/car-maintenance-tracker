import React from "react";
import Notifications from "./Notifications";
import { Moon } from "lucide-react";
import WelcomeHeader from "./WelcomeHeader";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-white absolute w-[99%] top-2  gap-2  p-1 justify-between shadow-lg rounded-sm hidden md:flex">
      <WelcomeHeader />
      <div className="flex gap-2">
        <div className="flex gap-1 text-xs items-center cursor-pointer">
          <Notifications />
          <div className="w-8 px-2 hover:bg-slate-100 rounded-full">
            <Moon className="h[15px] w-[15px]  " />
          </div>
        </div>
        <div className="h-[80%] w-[1px] mt-[3px] bg-slate-200" />
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
