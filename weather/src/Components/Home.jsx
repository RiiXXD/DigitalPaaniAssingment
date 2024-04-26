import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import styles from "./Home.module.css";
import Search from "./Search";
const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("default");
  const [isError, setIsError] = useState(false);

  const dateBuilder = () => {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  const onSearchChange = async (lat, long) => {
    fetch(
      `${process.env.REACT_APP_BASEURL}weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_APIKEY}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const weatherResponse = await response.json();
        console.log(weatherResponse);
        setCurrentWeather(weatherResponse);
        if (weatherResponse) {
          setBackgroundImage(
            weatherResponse.weather[0].description.split(" ").join("")
          );
          const isRainy = /rain/i.test(weatherResponse.weather[0].description);
          const isClear = /clear/i.test(weatherResponse.weather[0].description);
          if (isRainy) {
            setBackgroundImage("rain");
          } else if (isClear) {
            setBackgroundImage("clear");
            console.log("here");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        window.location.reload();
      });
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
    <Flex
      justify={"center"}
      align={"center"}
      flexDir={["column", "column", "row", "row"]}
      className={styles.Home}
      style={{ backgroundImage: `url("${backgroundImage}.jpg")` }}
    >
      <Container
        w={["95%", "95%", "90%", "90%"]}
        minH="70vh"
        p="2em"
        fontFamily="Raleway, sans-serif"
      >
        <Search
          onSearchChange={onSearchChange}
          getLocation={getLocation}
          setIsError={setIsError}
        />

        <VStack
          spacing={3}
          mt="1em"
          bgImage={
            currentWeather
              ? currentWeather.main.temp < 0
                ? `url("cold.jpg")`
                : currentWeather.main.temp > 40
                ? `url("blaze.jpg")`
                : ""
              : ""
          }
          bg={
            currentWeather
              ? currentWeather.main.temp >= 0 && currentWeather.main.temp <= 40
                ? "rgba(173, 216, 230, 0.4)"
                : ""
              : "rgba(173, 216, 230, 0.4)"
          }
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          textAlign={"center"}
          p="2em"
          borderRadius={"20px"}
          className={
            currentWeather &&
            (currentWeather.main.temp > 40 ? styles.burning : "")
          }
        >
          {!isError && (
            <>
              <Heading fontFamily="Raleway, sans-serif">
                {currentWeather ? Math.round(currentWeather.main.temp) : "-"}{" "}
                &#176;C
              </Heading>
              <Text fontSize="2em">
                {currentWeather ? currentWeather.weather[0].description : "-"}
              </Text>
              <Flex align={"center"} justify={"center"} gap={"10PX"}>
                <Text>Today •</Text>

                <Text>{dateBuilder()}</Text>
              </Flex>
              <Flex
                align={"center"}
                justify={"center"}
                gap={"10PX"}
                fontWeight={"bold"}
              >
                <CiLocationOn />
                <Text>
                  {currentWeather ? currentWeather.name : "New delhi"}
                </Text>
              </Flex>
            </>
          )}
          {isError && (
            <Container>
              <Heading>Sorry Cant find the place. Try again!</Heading>
            </Container>
          )}
        </VStack>
      </Container>
      {!isError && (
        <Flex
          flexDir={["row", "row", "column", "column"]}
          minH={["100%", "100%", "80vh", "80vh"]}
          mt={["1em", "1em", "0em", "0em"]}
          bg="rgba(173, 216, 230, 0.4)"
          textAlign={"center"}
          p="2em"
          borderRadius={"20px"}
          justify={[
            "space-between",
            "space-between",
            "space-evenly",
            "space-evenly",
          ]}
          align={["center", "center", "", ""]}
          flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
          gap={["20px", "20px", "0px", "0px"]}
        >
          <Box>
            <Divider />

            <Text>
              Humidity{" "}
              <span>
                <Heading>
                  {currentWeather && currentWeather.main.humidity}
                </Heading>
              </span>
              %
            </Text>
          </Box>
          <Box>
            <Divider />
            <Text>
              Visibility
              <span>
                <Heading>{currentWeather && currentWeather.visibility}</Heading>
              </span>
              miles
            </Text>
          </Box>
          <Box>
            <Divider />

            <Text>
              Wind Status{" "}
              <span>
                <Heading>
                  {currentWeather &&
                    Math.round(`${currentWeather.wind.speed}` * 2.237)}
                </Heading>
                mph
              </span>
            </Text>
          </Box>

          <Box>
            <Divider />
            <Text>
              Air Pressure
              <span>
                <Heading>
                  {currentWeather && currentWeather.main.pressure}
                </Heading>
              </span>
              mb
            </Text>
          </Box>

          <Divider />
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
