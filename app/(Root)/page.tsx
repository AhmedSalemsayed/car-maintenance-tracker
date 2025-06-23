import BarChart from "@/components/BarChart";
import MissedMaintenance from "@/components/MissedMaintenance";
import UpcomingMaintenance from "@/components/UpcomingMaintenance";
import {
  MaintenanceItem,
  MissedMaintenanceData,
  UpcomingMaintenanceData,
} from "@/lib/zodSchemas";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "RoboCar  | Home",
  description:
    "RoboCare is a maintenance management system for cars. It helps you keep track of your cars maintenance schedules and alerts you when maintenance is due.",
};

export default async function Home() {
  const supabase = await createClerkSupabaseClient();

  const { data: cars } = await supabase.from("cars").select("*");

  const UpcomingMaintenanceData: UpcomingMaintenanceData[] = cars?.map(
    (car) => [
      car.carId,
      car.brand,
      car.model,
      car?.Maintenance.filter((item: MaintenanceItem) => {
        return (
          item?.historyLog.at(-1)?.kilometrageNextMaintenance -
            item.currentKilometrage <=
            1000 &&
          item?.historyLog.at(-1)?.kilometrageNextMaintenance -
            item.currentKilometrage >
            0
        );
      }),
    ]
  );

  const MissedMaintenanceData: MissedMaintenanceData[] = cars?.map((car) => [
    car.carId,
    car.brand,
    car.model,
    car?.Maintenance.filter((item: MaintenanceItem) => {
      return (
        item.historyLog.at(-1)?.kilometrageNextMaintenance -
          item.currentKilometrage <=
        0
      );
    }),
  ]);
  return (
    <section className="w-full p-4 md:pt-0  flex flex-col gap-1 ">
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-3xl font-semibold text-slate-700 ">Dashboard</h1>
        <p className="text-slate-400 text-sm md:text-base lg:text-lg">
          Here&apos;s Your Car Maintenace Overview
        </p>
      </div>
      <div className="grid gap-5 md:gap-2 grid-cols-1 md:grid-cols-2   lg:grid-cols-4 grid-rows-[auto_auto_1fr]  overflow-auto">
        <UpcomingMaintenance data={UpcomingMaintenanceData} />
        <MissedMaintenance data={MissedMaintenanceData} />
        <BarChart />
      </div>
    </section>
  );
}
