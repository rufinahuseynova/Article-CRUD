import { FC, useState } from "react";
import { Button, Dialog, Input } from "@chakra-ui/react";

const UserFormModal: FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "female",
    status: "active",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog.Root size="cover" placement="center">
        <Dialog.Trigger>
          <Button mb={4}>Create New User</Button>
        </Dialog.Trigger>

        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>Create New User</Dialog.Header>
          <Dialog.Body>
            <Input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              mb={3}
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              mb={3}
            />
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorScheme="blue" onClick={handleChange}>
              Create
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default UserFormModal;
