import { UpcomingMaintenanceData } from "@/lib/zodSchemas";
import React from "react";

export default function UpcomingMaintenance({
  data,
}: {
  data: UpcomingMaintenanceData[];
}) {
  const noMissed = data
    ?.map((dataItem) => dataItem[3].length === 0)
    .every(Boolean);
  return (
    <div className="bg-white border-l-4 border-l-amber-300 min-h-44 p-4 rounded-lg shadow-md flex flex-col gap-3 oveflow-auto lg:col-start-1 lg:col-end-3">
      <h1 className="font-semibold text-lg md:text-xl tracking-widest text-slate-700 ">
        Upcoming Maintenance
      </h1>
      <ul className="flex flex-col gap-1 p-1 flex-1  divide-y-2 divide-slate-200 overflow-auto">
        {noMissed && (
          <p className="w-full h-full flex  justify-center items-center text-base md:text-lg lg:text-2xl text-slate-400  ">
            No Upcoming Maintenance
          </p>
        )}
        {data?.map(([carId, brand, model, Maintenance]) =>
          Maintenance.map((MaintenanceItem) => {
            return (
              <li
                className="flex justify-between items-center  p-1 rounded-sm "
                key={carId + MaintenanceItem.name}
              >
                <span className="text-sm md:text-base text-slate-600 font-semibold">
                  {MaintenanceItem.name} ({brand}&nbsp;{model})
                </span>
                <span className="text-xs md:text-sm font-semibold  text-slate-500">
                  {(
                    MaintenanceItem.historyLog.at(-1)
                      .kilometrageNextMaintenance -
                    MaintenanceItem.currentKilometrage
                  ).toLocaleString("en-US")}{" "}
                  &nbsp; KM
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
