import { Car, ChevronDown, ChevronUp, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NavLink from "./NavLink";
import { TooltipProvider } from "./ui/tooltip";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-row gap-4 items-center overflow-hidden">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <span className="font-LuckiestGuy text-black md:text-2xl md:ml-3">
          RoboCar
        </span>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-start pt-4">
        <TooltipProvider>
          <NavLink icon={<Home />} title="Home" href="/" />
          <NavLink icon={<Car />} title="Cars" href="Cars" />
        </TooltipProvider>
      </SidebarContent>

      <SidebarTrigger className="ml-2 rounded-none text-sidebar-foreground hover:bg-[#C5BAFF]  hover:text-white transition-all m-0 p-2 w-full" />

      <SidebarFooter className="hover:bg-[#C5BAFF]  hover:text-white transition-all">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 overflow-hidden w-full hover:bg-[#C5BAFF] ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h6 className="text-sm font-semibold">Ahmed salem</h6>
              <p className="text-[#9d8b8b] text-[9px] md:text-xs">
                ahmedtaco1996@gmail.com
              </p>
            </div>
            <span className="flex flex-col">
              <ChevronUp className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>SignOut</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
