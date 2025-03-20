import { useDeletePostMutation, useUpdatePostMutation } from "@/api/postsApi";
import {
  Box,
  Button,
  Flex,
  Input,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import CreatePost from "./CreatePost";

interface IProps {
  posts: any;
}

const Post: FC<IProps> = ({ posts }) => {
  const [editingPost, setEditingPost] = useState<any>();

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleUpdatePost = async (postId: number) => {
    if (!editingPost?.title || !editingPost?.body) return;
    try {
      await updatePost({ postId, updatedData: editingPost }).unwrap();
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId).unwrap();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleTitle = (e: any) =>
    setEditingPost(
      (prev: any) => ({ ...prev, title: e.target.value } as any)
    ) as any;

  const handleBody = (e: any) => {
    setEditingPost((prev) =>
      prev ? { ...prev, body: e.target.value } : undefined
    );
  };

  return (
    <>
      <VStack align="stretch">
        {posts.length === 0 ? (
          <Text>There is no posts ....</Text>
        ) : (
          posts?.map((post) => (
            <Box
              key={post.id}
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              bg="gray.50"
              boxShadow="sm"
            >
              {editingPost?.id === post.id ? (
                <>
                  <Input
                    value={editingPost?.title}
                    onChange={handleTitle}
                    placeholder="Title"
                    size="sm"
                    mb="2"
                  />
                  <Textarea
                    value={editingPost?.body}
                    onChange={handleBody}
                    placeholder="Body"
                    size="sm"
                    mb="2"
                  />
                  <Flex justify="flex-end" gap="2">
                    <Button
                      bgColor="blue.500"
                      size="sm"
                      onClick={() => handleUpdatePost(post.id)}
                    >
                      Save
                    </Button>
                    <Button
                      bgColor="gray.500"
                      size="sm"
                      onClick={() => setEditingPost(undefined)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </>
              ) : (
                <>
                  <Text>{post.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {post.body}
                  </Text>
                  <Flex justify="flex-end" gap="2" mt="2">
                    <Button
                      bgColor="yellow.500"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      bgColor="red.500"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          ))
        )}
      </VStack>
      <CreatePost />
    </>
  );
};

export default Post;
