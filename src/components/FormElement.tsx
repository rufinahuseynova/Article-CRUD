import { Input, Field } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormItem = ({ name }) => {
  const { control } = useFormContext();
  return (
    <Field.Root>
      <Field.Label>{name.toUpperCase()}</Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return <Input {...field} value={field.value} name={field.name} />;
        }}
      />
    </Field.Root>
  );
};

export default FormItem;
