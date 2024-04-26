import React from "react";
import {
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
const Home = () => {
  return (
    <Container w="80% ">
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
      <Box mt="1em" bg="rgba(173, 216, 230, 0.5)"></Box>
    </Container>
  );
};

export default Home;
