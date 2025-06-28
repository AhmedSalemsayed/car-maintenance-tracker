import CarCard from "../../../components/CarCard";
import { AnimatePresence } from "motion/react";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import AddNewCar from "@/components/AddNewCar";
export const metadata = {
  title: "RoboCar  | My Cars",
  description:
    "RoboCare is a maintenance management system for cars. It helps you keep track of your cars maintenance schedules and alerts you when maintenance is due.",
};
export default async function page() {
  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase.from("cars").select("*");
  return (
    <section className=" flex  flex-col flex-1 gap-3 p-1 h-full w-full  overflow-auto ">
      {data?.length ? (
        <div className="flex justify-end items-center">
          <AddNewCar />
        </div>
      ) : null}
      <div className="flex  flex-1 gap-4 justify-center items-center flex-wrap transition-all duration-500">
        {data?.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="lg:text-6xl">
              Welcome To
              <span className="bg-[url(../public/needle-underline.png)] font-LuckiestGuy ml-2 bg-no-repeat  bg-bottom ">
                RoboCar
              </span>
            </h1>
            <p className=" text-xl md:text-4xl ">Start By Adding Your cars</p>
            <AddNewCar />
          </div>
        ) : (
          <AnimatePresence>
            {data?.map((car) => (
              <CarCard key={car.carId} car={car} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
