"use client";

import { MaintenanceItem } from "@/lib/zodSchemas";
import { ColumnDef } from "@tanstack/react-table";
import { stat } from "fs";

export const columns: ColumnDef<MaintenanceItem>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: "Maintenance Item",
  },
  {
    accessorKey: "DateOfLastMaintenance",
    accessorFn: (row) => row.historyLog.at(-1)?.date,
    header: "Date of Last Maintenance",
  },
  {
    accessorKey: "KilometrageBeforeMaintenance",
    accessorFn: (row) => row.historyLog.at(-1)?.kilometrageBeforeMaintenance,
    header: "Kilometrage Before Maintenance (Km)",
  },
  {
    accessorKey: "KilometrageOfNextMaintenance",
    accessorFn: (row) => row.historyLog.at(-1)?.kilometrageNextMaintenance,
    header: "Kilometrage of Next Maintenance (Km)",
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => row.historyLog.at(-1)?.brand,
    header: "Brand",
  },
  {
    accessorKey: "price",
    accessorFn: (row) => row.historyLog.at(-1)?.price,
    header: "Price",
  },
  //   {
  //     accessorKey: "KilometrageOfNextMaintenance",
  //     header: "Kilometrage of Next Maintenance",
  //   },
  {
    accessorKey: "KilometrageRemainingTillNextMaintenance",
    accessorFn: (row) => {
      const currentKilometrage = row.currentKilometrage;
      const kilometrageOfNextMaintenance =
        row.historyLog.at(-1)?.kilometrageNextMaintenance;
      return kilometrageOfNextMaintenance! - currentKilometrage;
    },
    header: "Kilometrage Remaining Till Next Maintenance",
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      const currentKilometrage = row.currentKilometrage;
      const kilometrageOfNextMaintenance =
        row.historyLog.at(-1)?.kilometrageNextMaintenance;
      const difference = kilometrageOfNextMaintenance! - currentKilometrage;
      const status = difference > 0 ? "Good" : "Bad";
      return status;
    },
    header: "Status",
  },
];
