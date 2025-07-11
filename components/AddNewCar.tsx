"use client";
import { useMediaQuery } from "usehooks-ts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddNewCarForm from "./AddNewCarForm";
import { useEffect, useRef, useState } from "react";

export default function AddNewCar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          "bottom",
          `env(safe-area-inset-bottom)`
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize(); // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-md">
            <Plus />
            <span>Add A New Car</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0 py-4">
          <DialogHeader className="px-4">
            <DialogTitle>Add A New Car</DialogTitle>
            <DialogDescription>
              Add Car Details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <AddNewCarForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>Add A New Car</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="overflow-auto min-h-[70vh]"
        ref={formContainerRef}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle>Add A New Car</DrawerTitle>
          <DrawerDescription>
            Add Car Details here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <AddNewCarForm setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
