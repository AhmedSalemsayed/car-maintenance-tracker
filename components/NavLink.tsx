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
  icon: React.ReactNode;
  title: string;
  href: string;
}) => {
  return (
    <Link href={href} className="p-2 ">
      <SheetTrigger className=" flex items-center w-full gap-4 font-medium pl-[0.3rem]  hover:bg-[--btn-hover-bg-color] hover:text-white hover:font-semibold transition-all">
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
  exact = false,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  exact?: boolean;
}) {
  const { isMobile, state } = useSidebar();
  const pathName = usePathname();

  const isActive = exact
    ? pathName === href
    : pathName === href || pathName.startsWith(`${href}/`);
  return (
    <>
      {isMobile ? (
        <MobileLink icon={icon} title={title} href={href} />
      ) : state === "collapsed" ? (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={href}
              className={`flex items-center gap-4 p-2 font-semibold hover:bg-[--btn-hover-bg-color] ${
                isActive && "bg-[--btn-bg-color] text-white "
              }  hover:text-white hover:font-bold transition-all`}
            >
              <span className="ml-1">{icon}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="relative left-12 top-9 font-Roboto">
            {title}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link
          href={href}
          className={`flex items-center gap-4 p-2 font-medium hover:bg-[--btn-hover-bg-color] hover:text-white  transition-all ${
            isActive && "bg-[--btn-bg-color] text-white "
          } `}
        >
          <span className="ml-1">{icon}</span>
          <span className="tracking-wider font-Roboto ml-2 ">{title}</span>
        </Link>
      )}
    </>
  );
}
