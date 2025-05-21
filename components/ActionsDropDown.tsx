"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddNewMaintenaceForm from "./AddNewMaintenaceForm";
import { ActionsDropDownProps } from "@/lib/zodSchemas";

export function ActionsDropDown({ rowData }: ActionsDropDownProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SlOptionsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-52 right-3">
          <DialogTrigger className="w-full">
            <DropdownMenuItem onClick={() => setMode("add")}>
              <IoMdAdd />
              Add New Maintenance
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setMode("edit")}>
              <MdEdit />
              Edit Last Maintenance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode("edit")}>
              <FaHistory />
              View History
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* **************************** */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? `Edit Last ${rowData.name} Maintenance`
              : `Add New ${rowData.name} Maintenance`}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modify user data below."
              : "Enter the new Maintenance data."}
          </DialogDescription>
        </DialogHeader>

        {mode === "edit" ? (
          <div>
            <p>Form to edit</p>
            {/* Add real form here */}
          </div>
        ) : (
          <AddNewMaintenaceForm rowData={rowData} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
