import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import Notifications from "./Notifications";
export default function MobileHeader() {
  return (
    <header className="bg-white md:hidden flex p-1 justify-between">
      <Image src="/logo.png" alt="logo" width={25} height={25} />
      <span
        className={`text-center flex justify-center items-center ml-7 font-LuckiestGuy`}
      >
        RoboCar
      </span>
      <div className="flex gap-1 ">
        <Notifications />
        <SidebarTrigger />
      </div>
    </header>
  );
}
