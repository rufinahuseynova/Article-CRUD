import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Stack, Select, Field } from "@chakra-ui/react";

const SelectForm: FC<{ name: string; items: any }> = ({ name, items }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = Boolean(errors[name]);
  const errorMessage = errors[name]?.message;

  return (
    <Field.Root invalid={hasError}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Stack gap="5" width="320px">
              <Select.Root
                size="sm"
                collection={items}
                value={[field.value]}
                defaultValue={[field.value]}
                onValueChange={(newValue: any) => {
                  field.onChange(newValue.items[0].value);
                }}
              >
                <Select.Label>{name.toUpperCase()}</Select.Label>
                <Select.Control borderColor={hasError ? "red.500" : undefined}>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {items.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Stack>
          );
        }}
      />
      {hasError && (
        <Field.ErrorText color="red.500" mt={1} fontSize="sm">
          {errorMessage as string}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default SelectForm;
