import { Input, Field } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormItem = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = Boolean(errors[name]);
  const errorMessage = errors[name]?.message;

  return (
    <Field.Root invalid={hasError}>
      <Field.Label>{name.toUpperCase()}</Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value}
            name={field.name}
            borderColor={hasError ? "red.500" : undefined}
          />
        )}
      />
      {hasError && (
        <Field.ErrorText color="red.500" mt={1} fontSize="sm">
          {errorMessage as string}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default FormItem;
