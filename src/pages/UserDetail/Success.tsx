import { useUpdateUserMutation, useCreateUserMutation } from "@/api/userApi";
import FormItem from "@/components/FormElement";
import SelectForm from "@/components/SelectForm";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Box,
  Text,
  Button,
  createListCollection,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userSchema from "@/schema/userSchema";

interface IProps {
  user?: any;
}

const genders = createListCollection({
  items: [
    { label: "female", value: "female" },
    { label: "male", value: "male" },
  ],
});

const status = createListCollection({
  items: [
    { label: "active", value: "active" },
    { label: "inactive", value: "inactive" },
  ],
});

const UserDetail: FC<IProps> = ({ user }) => {
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const updatedData = { ...user };

  const methods = useForm({
    mode: "all",
    defaultValues: updatedData,
    resolver: yupResolver(userSchema),
  });

  const handleForm = methods.handleSubmit(async (data) => {
    try {
      if (user === undefined) {
        await createUser(data).unwrap();

        navigate("/");
      } else {
        await updateUser({ id: user.id, ...data }).unwrap();
        navigate("/");
      }
    } catch (error: any) {
      if (Array.isArray(error.data)) {
        error.data.forEach((err) => {
          if (err.field) {
            methods.setError(err.field, {
              type: "backend",
              message: err.message,
            });
          }
        });
      }
    }
  });

  if (isCreating || isUpdating) return <Spinner />;

  return (
    <Container
      maxW="xl"
      mt="10"
      bg="gray.50"
      p="6"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          mb="4"
          textAlign="center"
          color="gray.700"
        >
          User Details
        </Text>
        <FormProvider {...methods}>
          <VStack gap="16px">
            <FormItem name="name" />
            <FormItem name="email" />
            <SelectForm name="gender" items={genders} />
            <SelectForm name="status" items={status} />
          </VStack>
        </FormProvider>
        <Button onClick={handleForm} mt="16px" variant="solid" bg="blue.600">
          {user === undefined ? "Create user" : "Update user"}
        </Button>
      </Box>

      <Button
        onClick={() => navigate(-1)}
        mt="16px"
        bg="bg.subtle"
        variant="outline"
      >
        Back
      </Button>
    </Container>
  );
};

export default UserDetail;
