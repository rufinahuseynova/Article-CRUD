import { useParams } from "react-router-dom";

import UserDetail from "./Success.tsx";
import { useGetUserByIdQuery } from "@/api/userApi.tsx";
import ErrorPage from "./Error.tsx";
import Loading from "./Loading.tsx";

const UserDetailPage = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  return <UserDetail user={user} />;
};

export default UserDetailPage;
