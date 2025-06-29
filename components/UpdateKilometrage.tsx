import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { updateKiloMetrage } from "@/lib/serverUtils";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function UpdateKilometrage({
  carKilometrage,
  isOpen,
  setIsOpen,
}: {
  carKilometrage: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { carId }: { carId: string } = useParams();
  const form = useForm({
    defaultValues: {
      currentKilometrage: carKilometrage,
    },
  });

  async function onSubmit(value: { currentKilometrage: number }) {
    const newKilometrage = Number(value.currentKilometrage);
    try {
      await updateKiloMetrage(newKilometrage, carId).then(() => {
        setIsOpen(false);
        toast.success("Kilometrage updated successfully", {
          duration: 4000,
          closeButton: true,
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  function onError(value: { currentKilometrage: number }) {
    console.log(value);
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="btn-primary text-lg">
        Update Kilometrage
      </PopoverTrigger>
      <PopoverContent side="right">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FormField
              name="currentKilometrage"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="font-medium tracking-wide text-lg">
                    New Kilometrage
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter New Kilometrage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton isSubmitting={form.formState.isSubmitting} />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
