import React from "react";
import { Button } from "@/components/ui/Button";
import SpinnerMini from "@/components/SpinnerMini";

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <SpinnerMini />
          <span>Saving...</span>
        </>
      ) : (
        "Save"
      )}
    </Button>
  );
}
