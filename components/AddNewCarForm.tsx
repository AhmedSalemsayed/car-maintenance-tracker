import { useForm } from "react-hook-form";
import { HandleAddNewCar } from "@/lib/serverUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { newCarSchema, NewCarType } from "@/lib/zodSchemas";
import { Form, FormField } from "./ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";

export default function AddNewCarForm({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const form = useForm<NewCarType>({
    resolver: zodResolver(newCarSchema),
    defaultValues: {
      chassisNumber: "",
      brand: "",
      color: "",
      model: "",
      year: "",
      carImage: "",
      currentKilometrage: 0,
    },
  });

  const onSubmit = async (data: NewCarType) => {
    await HandleAddNewCar(data);
    setOpen(false);
    toast.success("Car added successfully!", {
      description: "Your car has been added to the list.",
    });
  };
  return (
    <Form {...form}>
      <form
        className={`space-y-2 w-full`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="chassisNumber"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Chassis Number"
              placeholder="Your Car Chassis Number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Brand"
              placeholder="Your Car Brand e.g Toyota"
            />
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Model"
              placeholder="Your Car Model e.g Corolla"
            />
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Year of Manufacture"
              placeholder="Your Car Year of Manufacture"
            />
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Color"
              placeholder="Your Car Color"
            />
          )}
        />
        <FormField
          control={form.control}
          name="currentKilometrage"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Current Kilometrage"
              placeholder="Your Car Current Kilometrage"
              type="number"
            />
          )}
        />

        <FormField
          control={form.control}
          name="carImage"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Upload Car Image"
              placeholder="Your Car Color"
              type="file"
            />
          )}
        />
        <SubmitButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
