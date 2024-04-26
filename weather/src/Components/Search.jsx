import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Search = ({ onSearchChange, getLocation, setIsError }) => {
  const [search, setSearch] = useState("");
  const handleOnEnter = (evt) => {
    if (evt.key === "Enter") {
      handleSearch(evt);
    }
  };
  const handleOnClick = (evt) => {
    handleSearch(evt);
  };
  const handleSearch = (evt) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const Response = await response.json();
        console.log(Response[0].lat, Response[0].lon);
        onSearchChange(Response[0].lat, Response[0].lon);
        setSearch("");
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
      });
  };

  return (
    <Flex
      width={"100%"}
      className="SearchBox"
      justifyContent={"space-between"}
      alignItems={"center"}
      bg=" rgba(173, 216, 230, 0.5)"
      p={["0.5em", "0.5em", "1em", "1em"]}
      borderRadius={"20px"}
    >
      <InputGroup w={"85%"}>
        <Input
          placeholder="Search for city,state,country"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleOnEnter(e)}
          fontWeight={"bold"}
        ></Input>
        <InputRightElement>
          <Button
            onClick={(e) => {
              handleOnClick(e);
            }}
          >
            <FaSearchLocation />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button onClick={getLocation} bg={["none", "none", "white", "white"]}>
        <FaLocationCrosshairs />
      </Button>
    </Flex>
  );
};

export default Search;
