import { useCreatePostMutation } from "@/api/postsApi";
import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const CreatePost: FC = () => {
  const { userId } = useParams();
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.body) return;
    try {
      await createPost({ user_id: userId, ...newPost }).unwrap();
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" bg="gray.50" boxShadow="sm">
      <Text fontSize="lg" fontWeight="bold" mb="2" color="gray.700">
        Add New Post
      </Text>
      <Input
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        size="sm"
        mb="2"
      />
      <Textarea
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        size="sm"
        mb="2"
      />
      <Flex justify="flex-end">
        <Button bgColor="green.500" size="sm" onClick={handleCreatePost}>
          Add New Post
        </Button>
      </Flex>
    </Box>
  );
};

export default CreatePost;
