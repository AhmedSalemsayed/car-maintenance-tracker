import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
export default function MobileHeader() {
  return (
    <header className="bg-white md:hidden flex p-1 justify-between">
      <Image src="/logo.png" alt="logo" width={25} height={25} />
      <span
        className={`text-center flex justify-center items-center  font-LuckiestGuy`}
      >
        RoboCar
      </span>
      <SidebarTrigger />
    </header>
  );
}
