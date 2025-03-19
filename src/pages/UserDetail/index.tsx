import { useParams } from "react-router-dom";

import { Text, Spinner } from "@chakra-ui/react";
import UserDetail from "./Success.tsx";
import { useGetUserByIdQuery } from "@/api/userApi.tsx";

const UserDetailPage = () => {
  console.log("mount");

  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error loading user details</Text>;

  return <UserDetail user={user} />;
};

export default UserDetailPage;
