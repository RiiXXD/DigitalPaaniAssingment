import React, { useEffect, useRef, useState } from "react";
import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import Search from "./Search";
const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const latitude = useRef(null);
  const longitude = useRef(null);

  const dateBuilder = () => {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  const onSearchChange = async (lat, long) => {
    try {
      fetch(
        `${process.env.REACT_APP_BASEURL}weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_APIKEY}`
      ).then(async (response) => {
        const weatherResponse = await response.json();
        console.log(weatherResponse);
        setCurrentWeather(weatherResponse);
      });
    } catch (e) {
      console.log(e);
    }

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
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      onSearchChange(latitude, longitude);
    }
  }, [coordinates]);

  return (
    <Container w="90%" minH="70vh" p="2em" bg="purple.100">
      <Search onSearchChange={onSearchChange} getLocation={getLocation} />
      <VStack
        spacing={3}
        mt="1em"
        bg="rgba(173, 216, 230, 0.4)"
        textAlign={"center"}
        p="2em"
      >
        <Heading>
          {currentWeather ? Math.round(currentWeather.main.temp) : "-"} &#176;C
        </Heading>
        <Text>
          {currentWeather ? currentWeather.weather[0].description : "-"}
        </Text>
        <Flex align={"center"} justify={"center"} gap={"10PX"}>
          <Text>Today •</Text>

          <Text>{dateBuilder()}</Text>
        </Flex>
        <Flex align={"center"} justify={"center"} gap={"10PX"}>
          <CiLocationOn />
          <Text>{currentWeather ? currentWeather.name : "New delhi"}</Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Home;
