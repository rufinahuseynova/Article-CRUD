import { Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Spinner
    size="xl"
    color="teal.500"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  />
);

export default Loading;
