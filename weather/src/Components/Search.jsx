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

const Search = ({ onSearchChange, getLocation }) => {
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
      `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${process.env.REACT_APP_APIKEY}`
    ).then(async (response) => {
      const Response = await response.json();
      console.log(Response[0].lat, Response[0].lon);
      onSearchChange(Response[0].lat, Response[0].lon);
    });
    setSearch("");
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
