"use client";

import { MaintenanceItem } from "@/lib/zodSchemas";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropDown } from "./ActionsDropDown";
import StatusPill from "./StatusPill";

export const columns: ColumnDef<MaintenanceItem>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: "Maintenance Item",
  },
  {
    accessorKey: "DateOfLastMaintenance",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "N/A";
      } else {
        return new Date(row?.historyLog?.at(-1)?.date).toLocaleDateString(
          "en-GB"
        );
      }
    },
    header: "Date of Last Maintenance",
  },
  {
    accessorKey: "KilometrageBeforeMaintenance",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "------";
      } else {
        return new Intl.NumberFormat().format(
          row.historyLog.at(-1)?.kilometrageBeforeMaintenance!
        );
      }
    },
    header: "Kilometrage Before Maintenance (Km)",
  },
  {
    header: "Change Every (Km)",
    accessorFn: (row) => new Intl.NumberFormat().format(row.changeEvery),
  },
  {
    accessorKey: "KilometrageOfNextMaintenance",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "------";
      } else {
        return new Intl.NumberFormat().format(
          row.historyLog.at(-1)?.kilometrageNextMaintenance!
        );
      }
    },
    header: "Kilometrage of Next Maintenance (Km)",
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "------";
      } else {
        return row.historyLog.at(-1)?.brand;
      }
    },
    header: "Brand",
  },
  {
    accessorKey: "price",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "------";
      } else {
        return row.historyLog.at(-1)?.price;
      }
    },
    header: "Price",
  },
  {
    accessorKey: "KilometrageRemainingTillNextMaintenance",
    accessorFn: (row) => {
      if (!row.historyLog || row.historyLog.length === 0) {
        return "------";
      } else {
        const currentKilometrage = row.currentKilometrage;
        const kilometrageOfNextMaintenance =
          row.historyLog.at(-1)?.kilometrageNextMaintenance;

        return new Intl.NumberFormat().format(
          kilometrageOfNextMaintenance! - currentKilometrage
        );
      }
    },
    header: "Kilometrage Remaining Till Next Maintenance (Km)",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (obj) => {
      const currentKilometrage = obj.row.original.currentKilometrage;
      const kilometrageOfNextMaintenance =
        obj.row.original.historyLog?.at(-1)?.kilometrageNextMaintenance;
      const difference = kilometrageOfNextMaintenance! - currentKilometrage;
      const status = difference > 0 ? "Good" : "Bad";

      return (
        <>
          {status === "Good" ? (
            <StatusPill className=" border border-[#188038] text-[#188038] bg-[#e6f4ea]  ">
              {status}
            </StatusPill>
          ) : (
            <StatusPill className=" text-red-400 bg-red-800 animate-pulse font-semibold">
              {status}
            </StatusPill>
          )}
        </>
      );
    },
  },
  {
    header: "Actions",
    cell: (obj) => {
      const rowData = obj.row.original;
      return <ActionsDropDown rowData={rowData} />;
    },
  },
];
