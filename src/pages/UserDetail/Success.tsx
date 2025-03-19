import { useUpdateUserMutation, useCreateUserMutation } from "@/api/userApi";
import FormItem from "@/components/FormElement";
import SelectForm from "@/components/SelectForm";
import {
  Container,
  Box,
  Text,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
    { label: "passive", value: "passive" },
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
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  });


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
          fontSize="2xl"
          fontWeight="bold"
          mb="4"
          textAlign="center"
          color="teal.600"
        >
          User Details
        </Text>
        <FormProvider {...methods}>
          <FormItem name="name" />
          <FormItem name="email" />
          <SelectForm name="gender" items={genders} />
          <SelectForm name="status" items={status} />
        </FormProvider>
        <Button onClick={handleForm}>
          {user === undefined ? "Create user" : "Update user"}
        </Button>
      </Box>

      <Button onClick={() => navigate(-1)}>Back</Button>
    </Container>
  );
};

export default UserDetail;
