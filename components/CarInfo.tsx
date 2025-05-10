"use client";
import { car } from "@/lib/zodSchemas";
import Image from "next/image";
import CountUp from "react-countup";

export default function CarInfo({ car }: { car: car }) {
  return (
    <div className="flex gap-4 md:gap-8">
      <Image
        src={car.carImage}
        alt="car image"
        width={100}
        height={100}
        className="rounded-lg object-fill w-24 h-24 md:w-48 md:h-36"
      />
      <div className="flex flex-1 gap-4 ">
        <div className="flex flex-col gap-3 md:gap-5">
          <h2 className="text-lg font-semibold md:text-2xl">{car.brand}</h2>
          <p className="text-sm text-gray-500 space-x-2 capitalize md:text-lg">
            <span>{car.model}</span>
            <span>{car.year}</span>
          </p>
          <p className="text-sm text-gray-500 capitalize  md:text-lg">
            {car.color}
          </p>
        </div>
        <div className="flex justify-center items-center font-semibold text-gray-700  text-2xl md:text-3xl tracking-wider flex-1 gap-2 ">
          <CountUp
            end={car.currentKilometrage}
            duration={2.75}
            delay={0}
            suffix="Km"
          />
        </div>
      </div>
    </div>
  );
}
