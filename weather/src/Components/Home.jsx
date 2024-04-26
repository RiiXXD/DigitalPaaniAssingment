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
  const onSearchChange = async (lat, long) => {
    console.log(lat, long, process.env.REACT_APP_BASEURL); // Getting Place
    // fetch(
    //   `${process.env.REACT_APP_BASEURL}weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_APIKEY}`
    // ).then(async (response) => {
    //   const weatherResponse = await response.json();
    //   console.log(weatherResponse);
    //   //   setCurrentWeather(weatherResponse);
    // });

    // fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`
    // ).then(async (response) => {
    //   const foreCastResponse = await response.json();
    //   setCurrentForecast(foreCastResponse);
    // });

    // // Switching Displays

    // displayDiv.current.classList.add("show");
    // searchDiv.current.classList.remove("show");
  };
  return (
    <Container w="90%" minH="70vh" p="2em" bg="purple.100">
      <Search onSearchChange={onSearchChange} />
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
