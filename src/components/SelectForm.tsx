import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Stack, Select } from "@chakra-ui/react";

const SelectForm: FC<{ name: string; items: any }> = ({ name, items }) => {
  const { control } = useFormContext();

  return (
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
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select gender" />
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
  );
};

export default SelectForm;
