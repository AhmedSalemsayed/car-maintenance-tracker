import { Car, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NavLink from "./NavLink";
import { TooltipProvider } from "./ui/tooltip";

export async function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-white">
      <SidebarHeader className="flex flex-row gap-1 items-center overflow-hidden pt-3">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <span className="font-LuckiestGuy dark:text-white tracking-wide text-black md:text-2xl md:ml-3">
          RoboCar
        </span>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-start pt-4">
        <TooltipProvider>
          <NavLink icon={<Home />} title="Home" href="/" exact={true} />
          <NavLink icon={<Car />} title="Cars" href="/cars" />
        </TooltipProvider>
      </SidebarContent>

      <SidebarTrigger className="ml-2 rounded-none text-sidebar-foreground hover:bg-[--btn-hover-bg-color]  hover:text-white transition-all m-0 p-2 w-full" />
    </Sidebar>
  );
}
