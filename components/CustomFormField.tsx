import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { AddNewMaintenance } from "@/lib/zodSchemas";

type CustomFormFieldProps = {
  field: ControllerRenderProps<AddNewMaintenance>;
  label: string;
  placeholder: string;
  type?: string;
};

export default function CustomFormField({
  field,
  label,
  placeholder,
  type = "text",
}: CustomFormFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          {...field}
          onChange={(e) => {
            if (type === "number") {
              field.onChange(Number(e.target.value));
            } else {
              field.onChange(e.target.value);
            }
          }}
          disabled={label === "Kilometrage of  Next Maintenance" ? true : false}
        />
      </FormControl>
      {label === "Kilometrage of  Next Maintenance" ? (
        <FormDescription>
          This Field is Calculated Based on ChangeEvery, If You Want To Change
          It, Please Change the ChangeEvery Field.
        </FormDescription>
      ) : (
        false
      )}
      <FormMessage />
    </FormItem>
  );
}
