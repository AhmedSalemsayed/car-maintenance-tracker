import { rowData } from "@/lib/zodSchemas";

interface EditLastMaintenanceProps extends rowData {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditLastMaintenanceForm({
  rowData,
  setOpen,
}: EditLastMaintenanceProps) {
  return <div>EditLastMaintenanceForm</div>;
}
