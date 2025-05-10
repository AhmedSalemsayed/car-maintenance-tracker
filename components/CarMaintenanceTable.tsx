"use client";

import { columns } from "./Columns";
import DataTable from "./DataTable";

export default function CarMaintenanceTable({ maintainanceData }) {
  //media query logic here to display card or table
  return (
    <div>
      <DataTable columns={columns} data={maintainanceData} />
    </div>
  );
}
