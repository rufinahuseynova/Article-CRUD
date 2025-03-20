import { Box, Text, Button, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error }: { error: any }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      gap={4}
    >
      <Icon boxSize={12} color="red.500">
        <div>test</div>
      </Icon>
      <Text fontSize="2xl" fontWeight="bold">
        Oops! Something went wrong.
      </Text>
      <Text color="gray.600">
        {error?.message ||
          "An unexpected error occurred while loading user details."}
      </Text>
      <Button colorScheme="teal" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
