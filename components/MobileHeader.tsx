import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import DarkModeBtn from "./DarkModeBtn";
export default function MobileHeader() {
  return (
    <header className="bg-white md:hidden flex px-4 py-1 justify-between dark:bg-[#1e1e1e]">
      <Image
        src="/logo.png"
        alt="logo"
        width={30}
        height={30}
        className="dark:invert dark:brightness-200"
      />
      <span
        className={`text-center text-2xl flex justify-center items-center mt-1 ml-7 font-LuckiestGuy`}
      >
        RoboCar
      </span>
      <div className="flex gap-1 ">
        <DarkModeBtn />
        <SidebarTrigger className="mt-[1px] h-9" />
      </div>
    </header>
  );
}
