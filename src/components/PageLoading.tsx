import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center
      h="100%"
      w="100%"
      position="fixed"
      top={0}
      left={0}
      bg="transparent"
      backdropFilter="blur(4px)"
      zIndex={9999}
    >
      <Spinner size="xl" color="#A73EF9" borderWidth={"4px"} />
    </Center>
  );
};

export default Loading;
