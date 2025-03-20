import {
  Container,
  Text,
  Input,
  Spinner,
  Flex,
  Alert,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserPostsQuery } from "@/api/postsApi";
import { useEffect } from "react";

import Post from "./Success";

const UserPostPage = () => {
  const { userId } = useParams();
  const [titleQuery, setTitleQuery] = useState("");
  const [bodyQuery, setBodyQuery] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState(titleQuery);
  const [debouncedBody, setDebouncedBody] = useState(bodyQuery);

  const {
    data: posts,
    isLoading,
    error: isError,
  } = useGetUserPostsQuery({
    userId,
    titleQuery: debouncedTitle,
    bodyQuery: debouncedBody,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTitle(titleQuery), 500);
    return () => clearTimeout(handler);
  }, [titleQuery]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedBody(bodyQuery), 500);
    return () => clearTimeout(handler);
  }, [bodyQuery]);

  if (isLoading)
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner
          size="xl"
          color="teal.500"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Flex>
    );

  if (isError)
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Failed to load posts.</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );

  return (
    <Container>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        color="gray.800"
        mb="6"
      >
        {userId}'s Posts
      </Text>
      <Stack>
        <Input
          placeholder="Search by Title"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
        />
        <Input
          placeholder="Search by Body"
          value={bodyQuery}
          onChange={(e) => setBodyQuery(e.target.value)}
        />
      </Stack>
      <Post posts={posts} />
    </Container>
  );
};

export default UserPostPage;
