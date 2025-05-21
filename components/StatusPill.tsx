import { cn } from "@/lib/utils";

type props = {
  children: React.ReactNode;
  className?: string;
};

export default function StatusPill({ children, className }: props) {
  return (
    <div className={cn("px-2 py-1 rounded-lg", className)}>
      <span>{children}</span>
    </div>
  );
}
