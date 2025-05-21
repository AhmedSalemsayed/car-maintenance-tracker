"use client";

import { useMediaQuery } from "usehooks-ts";
import { columns } from "./Columns";
import DataTable from "./DataTable";

export default function CarMaintenanceTable({ maintainanceData }) {
  //media query logic here to display card in small screens or table in large screens
  const isNotMobile = useMediaQuery("(min-width: 745px)");
  return (
    <>
      {isNotMobile ? (
        <DataTable columns={columns} data={maintainanceData} />
      ) : (
        <p>Mobile view</p>
      )}
    </>
  );
}
