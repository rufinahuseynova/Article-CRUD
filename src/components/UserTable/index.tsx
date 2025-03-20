import { FC, useState } from "react";
import { Spinner } from "@chakra-ui/react";

import { useGetUsersQuery } from "@/api/userApi.tsx";

import UserTable from "./Success.tsx";

const Table: FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 20;
  const [gender, setGender] = useState(null);
  const [status, setStatus] = useState(null);
  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery({
    page,
    perPage,
    gender,
    status,
  });

  if (isLoading || !users)
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

  return (
    <UserTable
      page={page}
      users={users}
      setStatus={setStatus}
      setGender={setGender}
      setPage={setPage}
      status={status}
      gender={gender}
    />
  );
};

export default Table;
