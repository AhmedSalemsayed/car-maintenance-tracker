import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import Notifications from "./Notifications";
export default function MobileHeader() {
  return (
    <header className="bg-white md:hidden flex p-1 justify-between dark:bg-[#1e1e1e]">
      <Image
        src="/logo.png"
        alt="logo"
        width={30}
        height={25}
        className="dark:invert dark:brightness-200"
      />
      <span
        className={`text-center text-2xl flex justify-center items-center ml-7 font-LuckiestGuy`}
      >
        RoboCar
      </span>
      <div className="flex gap-1 ">
        <Notifications />
        <SidebarTrigger className="mt-[1px]" />
      </div>
    </header>
  );
}
