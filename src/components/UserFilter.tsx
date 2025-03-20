"use client";

import {
  Portal,
  Select,
  createListCollection,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";

interface FilterProps {
  gender: string | null;
  setGender: (value: string | null) => void;
  status: string | null;
  setStatus: (value: string | null) => void;
}

const genderOptions = createListCollection({
  items: [
    { label: "All", value: null },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
});

const statusOptions = createListCollection({
  items: [
    { label: "All", value: null },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
});

const Filter: React.FC<FilterProps> = ({
  gender,
  setGender,
  status,
  setStatus,
}) => {
  return (
    <HStack justify="space-between" mb={4} alignItems="center">
      <Box>
        <Text fontSize="sm" mb={1}>
          Filter by Gender
        </Text>
        <Select.Root
          collection={genderOptions}
          size="sm"
          width="180px"
          value={[gender] as string[]}
          onValueChange={(gender) => {
            setGender(gender.value[0]);
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select gender" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {genderOptions.items.map((option) => (
                  <Select.Item item={option} key={option.value || "all"}>
                    {option.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>

      <Box>
        <Text fontSize="sm" mb={1}>
          Filter by Status
        </Text>
        <Select.Root
          collection={statusOptions}
          size="sm"
          width="180px"
          value={[status] as string[]}
          onValueChange={(status) => {
            setStatus(status.value[0]);
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select status" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {statusOptions.items.map((option) => (
                  <Select.Item item={option} key={option.value || "all"}>
                    {option.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
    </HStack>
  );
};

export default Filter;
