import React from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Search = () => {
  const handleOnChange = (e) => {
    const id=setTimeout(()=>{
    fetchSearchResults(key);
      },1000);
     
      return ()=>{
        clearTimeout(id);
      }
    
    }
  };
  return (
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
          onChange={(e) => handleOnChange(e)}
        ></Input>
        <InputRightElement>
          <FaSearchLocation />
        </InputRightElement>
      </InputGroup>
      <Button>
        <FaLocationCrosshairs />
      </Button>
    </Flex>
  );
};

export default Search;
