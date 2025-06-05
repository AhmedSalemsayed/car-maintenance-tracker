import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonForm() {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[150px] rounded-xl" />
        <Skeleton className="h-10 w-full " />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[150px] rounded-xl" />
        <Skeleton className="h-10 w-full " />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[150px] rounded-xl" />
        <Skeleton className="h-10 w-full " />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[150px] rounded-xl" />
        <Skeleton className="h-10 w-full " />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[150px] rounded-xl" />
        <Skeleton className="h-10 w-full " />
      </div>
    </>
  );
}
