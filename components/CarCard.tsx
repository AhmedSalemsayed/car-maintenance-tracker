"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
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
  const carImageName = car.carImage.split("/").at(-1);
  return (
    <Card className={cn("p-2 w-[223px] h-[340px]", className)} {...props}>
      <div className="relative aspect-square ">
        <Image
          src={car?.carImage}
          alt="car image"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl  hover:scale-105 transition-transform duration-300"
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
          className="bg-[#E9E1ff] text-[#7949ff] text-sm w-8/12"
          disabled={isDeleting}
        >
          <Link href={`/${car.carId}`}>View</Link>
        </Button>
        <div className="flex gap-2 text-muted-foreground">
          <Share2 />
          <button
            disabled={isDeleting}
            onClick={() => {
              setIsDeleting(true);
              deleteCar(car?.carId, carImageName).then(() => {
                setIsDeleting(false);
              });
            }}
          >
            {isDeleting ? (
              <>
                <SpinnerMini />
              </>
            ) : (
              <Trash2 />
            )}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
