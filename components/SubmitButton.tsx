import React from "react";
import SpinnerMini from "@/components/SpinnerMini";

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className="p-4 mt-auto flex flex-colgap- py-0">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary tracking-wide inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-Roboto font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-slate-900"
      >
        {isSubmitting ? (
          <div className="dark:text-white flex justify-center items-center gap-2">
            <SpinnerMini />
            <span>Saving...</span>
          </div>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
}
