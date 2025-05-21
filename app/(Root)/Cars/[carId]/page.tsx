import CarInfo from "@/components/CarInfo";
import CarMaintenanceTable from "@/components/CarMaintenanceTable";
import { car } from "@/lib/zodSchemas";
import { createClerkSupabaseClient } from "@/utils/supabase/server";

export default async function Page({ params }) {
  const { carId } = await params;
  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase.from("cars").select("*").eq("carId", carId);

  const car: car = data?.at(0);
  const maintainanceData = car?.Maintenance;
  return (
    <section className="flex flex-col flex-1 gap-2 p-1 md:pt-4  w-full ">
      <CarInfo car={car} />
      <CarMaintenanceTable maintainanceData={maintainanceData} />
    </section>
  );
}
