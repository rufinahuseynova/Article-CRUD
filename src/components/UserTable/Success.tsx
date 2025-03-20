import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Flex,
  HStack,
  Stack,
  Table,
} from "@chakra-ui/react";

import { useDeleteUserMutation } from "@/api/userApi";

import Filter from "../UserFilter";
import { useState } from "react";

const UserTable = ({
  users,
  page,
  setPage,
  status,
  setStatus,
  gender,
  setGender,
}) => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [deleteUser] = useDeleteUserMutation();

  const handleUser = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handleNavigate = () => navigate("/user/create");

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    setLoadingId(id);
    try {
      await deleteUser(id).unwrap();
    } catch (err) {}
  };

  const handleViewPosts = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    navigate(`/user/${id}/posts`);
  };

  return (
    <Container mt="2">
      <Stack gap="3">
        <Flex justify="space-between" align={"center"}>
          <Button
            size="sm"
            bgColor="blue.500"
            mt="3"
            width="150px"
            onClick={handleNavigate}
          >
            Create new user+
          </Button>
          <Filter
            gender={gender}
            setGender={setGender}
            status={status}
            setStatus={setStatus}
          />
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
          {users.map((user: any) => (
            <Table.Row
              key={user.id}
              onClick={(e) => {
                e.stopPropagation();
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
                  onClick={(e) => handleDelete(e, user.id)}
                  loading={loadingId === user.id}
                  bgColor="red"
                  margin="5px"
                >
                  Delete
                </Button>
                <Button
                  size="xs"
                  margin="5px"
                  bgColor="blue.600"
                  color="white"
                  onClick={(e) => handleViewPosts(e, user.id)}
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
