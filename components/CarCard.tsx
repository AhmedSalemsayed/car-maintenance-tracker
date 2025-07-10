"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Share2, Trash2 } from "lucide-react";
import { deleteCar } from "@/lib/serverUtils";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type CardProps = React.ComponentProps<typeof Card> & {
  car: {
    carImage: string;
    brand: string;
    model: string;
    carId: number;
    year: string;
    color: string;
  };
};

export default function CarCard({ className, car, ...props }: CardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const carImageName = car.carImage.split("/").at(-1);
  const isDefaultImage =
    car?.carImage ===
    "https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images//DefaultCarImage.png";

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // to prevent radix from closing the dialog before the async operation completes
    setIsDeleting(true);
    await deleteCar(car?.carId, carImageName!);
    setIsDeleting(false);
    setIsOpen(false);
    toast.success("Car deleted successfully");
  };

  return (
    <Card
      className={cn("p-2 w-[223px] h-[340px] dark:bg-[#1e1e1e]", className)}
      {...props}
    >
      <div className="relative aspect-square ">
        <Image
          src={car?.carImage}
          alt="car image"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover rounded-xl  hover:scale-105 transition-transform duration-300 ${
            isDefaultImage && "dark:invert-[0.5]"
          }`}
        />
      </div>
      <CardHeader>
        <CardTitle>{car?.brand}</CardTitle>
        <CardDescription>
          {car?.model} {car?.year}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          asChild
          className="bg-[--btn-bg-color] hover:bg-[--btn-hover-bg-color] font-medium text-sm w-8/12"
          disabled={isDeleting}
        >
          <Link href={`cars/${car.carId}`}>View</Link>
        </Button>
        <div className="flex gap-2 text-muted-foreground">
          <Share2 />

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
              <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your car profile and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:bg-black dark:hover:bg-gray-800">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {" "}
                    {isDeleting ? (
                      <>
                        <SpinnerMini />
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}

// <button
//   disabled={isDeleting}
//   onClick={() => {
//     setIsDeleting(true);
//     deleteCar(car?.carId, carImageName!).then(() => {
//       setIsDeleting(false);
//     });
//   }}
// >
// {
//   isDeleting ? (
//     <>
//       <SpinnerMini />
//     </>
//   ) : (
//     <Trash2 />
//   );
// }
// </button>;
