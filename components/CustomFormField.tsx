import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type CustomFormFieldProps<T extends FieldValues> = {
  field: ControllerRenderProps<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

export default function CustomFormField<T extends FieldValues>({
  field,
  label,
  placeholder,
  type = "text",
}: CustomFormFieldProps<T>) {
  const isFileInput = type === "file";
  const isDisabled = label === "Kilometrage of  Next Maintenance";
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          className="file:rounded-full file:mr-20 file:border-0 file:bg-violet-50 file:px-4 file:py-1 file:cursor-pointer file:text-sm file:font-semibold file:text-violet-700"
          type={type}
          placeholder={placeholder}
          {...(isFileInput ? {} : { value: field.value })}
          ref={field.ref}
          name={field.name}
          onBlur={field.onBlur}
          onChange={(e) => {
            if (type === "number") {
              field.onChange(Number(e.target.value));
            } else if (type === "file") {
              field.onChange(e.target.files);
            } else {
              field.onChange(e.target.value);
            }
          }}
          disabled={isDisabled}
        />
      </FormControl>
      {isDisabled && (
        <FormDescription>
          This Field is Calculated Based on ChangeEvery, If You Want To Change
          It, Please Change the ChangeEvery Field.
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
