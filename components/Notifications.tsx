import { Bell } from "lucide-react";
import React from "react";

export default function Notifications() {
  return (
    <div className="w-8 px-1 flex justify-center items-center hover:bg-slate-100 rounded-full">
      <Bell className="h[15px] w-[15px]  " />
    </div>
  );
}
