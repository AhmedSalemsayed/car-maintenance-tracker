import MissedMaintenance from "@/components/MissedMaintenance";
import UpcomingMaintenance from "@/components/UpcomingMaintenance";
export const metadata = {
  title: "RoboCar  | Home",
  description:
    "RoboCare is a maintenance management system for cars. It helps you keep track of your cars maintenance schedules and alerts you when maintenance is due.",
};

export default async function Home() {
  return (
    <section className="grid  gap-2 p-1 md:pt-4  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 overflow-auto">
      <UpcomingMaintenance />
      <MissedMaintenance />
    </section>
  );
}
