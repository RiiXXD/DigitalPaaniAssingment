import React from "react";
import {
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
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
    <Container w="90%" minH="70vh" p="2em">
      <Flex
        width={"100%"}
        className="SearchBox"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputGroup>
          <Input
            placeholder="Search for city,state,country"
            type="text"
          ></Input>
          <InputRightElement>
            <FaSearchLocation />
          </InputRightElement>
        </InputGroup>
        <Button>
          <FaLocationCrosshairs />
        </Button>
      </Flex>
      <Box mt="1em" bg="rgba(173, 216, 230, 0.1)" textAlign={"center"} p="2em">
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
      </Box>
    </Container>
  );
};

export default Home;
