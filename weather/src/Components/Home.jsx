import React from "react";
import {
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import Search from "./Search";
const Home = () => {
  const dateBuilder = () => {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  return (
    <Container w="90%" minH="70vh" p="2em" bg="purple.100">
      <Search />
      <VStack
        spacing={3}
        mt="1em"
        bg="rgba(173, 216, 230, 0.4)"
        textAlign={"center"}
        p="2em"
      >
        <Heading>34 &#176;</Heading>
        <Text>Haze</Text>
        <Flex align={"center"} justify={"center"} gap={"10PX"}>
          <Text>Today •</Text>

          <Text>{dateBuilder()}</Text>
        </Flex>
        <Flex align={"center"} justify={"center"} gap={"10PX"}>
          <CiLocationOn />
          <Text>New Delhi</Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Home;
