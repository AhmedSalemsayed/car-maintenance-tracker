import { Bell } from "lucide-react";
import React from "react";

export default function Notifications() {
  return (
    <div className="p-1 flex justify-center items-center hover:bg-slate-200 dark:hover:bg-[#2a2a2a] rounded-full">
      <Bell className="h-4 w-4  " />
    </div>
  );
}
