"use client";
import React from "react";
import { SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";

const MobileLink = ({
  icon,
  title,
  href,
}: {
  icon: any;
  title: string;
  href: string;
}) => {
  return (
    <Link href={href} className="p-2 ">
      <SheetTrigger className=" flex items-center w-full gap-4 font-medium pl-[0.3rem] hover:bg-[#C5BAFF] hover:text-white hover:font-semibold transition-all">
        {icon}
        <span className="font-Roboto">{title}</span>
      </SheetTrigger>
    </Link>
  );
};

export default function NavLink({
  icon,
  title,
  href,
}: {
  icon: any;
  title: string;
  href: string;
}) {
  const { isMobile, state } = useSidebar();
  const pathName = usePathname();
  const active = pathName === href;
  return (
    <>
      {isMobile ? (
        <MobileLink icon={icon} title={title} href={href} />
      ) : state === "collapsed" ? (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={href}
              className={`flex items-center gap-4 p-2 font-semibold hover:bg-[#C5BAFF] ${
                active && "bg-[#7949FF] text-white "
              }  hover:text-white hover:font-bold transition-all`}
            >
              <span className="ml-1">{icon}</span>
              <span className="tracking-wider">{title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="relative left-[100%] top-9 font-Roboto">
            {title}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link
          href={href}
          className={`flex items-center gap-4 p-2 font-semibold hover:bg-[#C5BAFF] hover:text-white hover:font-bold transition-all ${
            active && "bg-[#7949FF] text-white "
          } `}
        >
          <span className="ml-1">{icon}</span>
          <span className="tracking-wider font-Roboto ml-2 ">{title}</span>
        </Link>
      )}
    </>
  );
}
