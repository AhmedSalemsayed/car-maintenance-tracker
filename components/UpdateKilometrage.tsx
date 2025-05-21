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
}: {
  carKilometrage: number;
}) {
  const { carId }: { carId: string } = useParams();
  const form = useForm({
    defaultValues: {
      currentKilometrage: carKilometrage,
    },
  });

  async function onSubmit(value: { currentKilometrage: number }) {
    const newKilometrage = Number(value.currentKilometrage);
    await updateKiloMetrage(newKilometrage, carId);
    toast.success("Kilometrage updated successfully", {
      duration: 4000,
      closeButton: true,
    });
  }
  function onError(value: { currentKilometrage: number }) {
    console.log(value);
  }
  return (
    <Popover>
      <PopoverTrigger className="btn-primary text-lg">
        Update Kilometrage
      </PopoverTrigger>
      <PopoverContent>
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
