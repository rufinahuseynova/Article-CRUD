import { FC, useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../api/userApi.tsx";
import {
  Button,
  Container,
  HStack,
  Spinner,
  Table,
  Stack,
  Flex,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster.tsx";

const UserTable: FC = () => {
  // const toaster = useToast();
  const navigate = useNavigate(); //rg
  const [page, setPage] = useState(1);
  const perPage = 20;
  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery({
    page,
    perPage,
  });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  if (isLoading)
    return (
      <Spinner
        size="xl"
        color="teal.500"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    );
  if (error) return <p>Error loading data...</p>;

  const handleUser = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handleNavigate = () => navigate("/user/create");
  // rfn
  const handleViewPosts = (id: number) => {
    navigate(`/user/${id}/posts`);
  };
  const handleDelete = async (e: any, id: number) => {
    e.stopPropagation();
    console.log("here");

    try {
      console.log("Deleting user...");
      const response = await deleteUser(id).unwrap();
      console.log(response);
      toaster.success({
        title: "User deleted",
        description: `User ID ${id} has been removed.`,
      });
    } catch (err) {
      toaster.create({
        title: "Error",
        description: "Failed to delete user.",
        type: "error",
      });
    }
  };
  // frn over
  return (
    <Container mt="2">
      <Stack wrap="wrap" gap="3">
        <Flex justify="flex-end">
          <Button
            size="sm"
            bgColor="teal.600"
            mt="3"
            width="150px"
            onClick={handleNavigate}
          >
            Create new user+
          </Button>
        </Flex>
      </Stack>
      <Table.Root mt={35} variant="line" border="1px solid gray">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader border="1px solid gray">ID</Table.ColumnHeader>
            <Table.ColumnHeader border="1px solid gray">
              Name
            </Table.ColumnHeader>
            <Table.ColumnHeader border="1px solid gray">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users?.map((user: any) => (
            <Table.Row
              key={user.id}
              onClick={() => {
                handleUser(user.id);
              }}
              cursor="pointer"
              _even={{ bg: "gray.100" }}
              _odd={{ bg: "white" }}
            >
              <Table.Cell border="1px solid gray">{user.id}</Table.Cell>
              <Table.Cell border="1px solid gray">{user.name}</Table.Cell>
              <Table.Cell border="1px solid gray">
                <Button
                  size="xs"
                  onClick={(e) => {
                    handleDelete(e, user.id);
                    toaster.create({
                      description: "File saved successfully",
                      type: "info",
                    });
                  }}
                  loading={isDeleting}
                  bgColor="red"
                >
                  Delete
                </Button>
                <Button
                  size="xs"
                  bgColor="blue.400"
                  color="white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPosts(user.id);
                  }}
                >
                  View Posts
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <HStack mt="30px" w="300px" p={4} mx="auto">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          mr={4}
        >
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </HStack>
    </Container>
  );
};

export default UserTable;
