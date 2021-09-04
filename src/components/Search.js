import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";

const Search = ({
  search,
  setSearch,
  setSearchRes,
  isSearching,
  toggleIsSearching,
  searchProducts,
}) => {
  return (
    <Box w="390px">
      {" "}
      <InputGroup>
        <Input
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          onFocus={() => {
            toggleIsSearching(true);
            setSearchRes([]);
          }}
          p={5}
          variant="outline"
          placeholder="Search"
        />
        <InputRightAddon
          ml={-2}
          mr={-4}
          display={isSearching ? "inline" : "none"}
        >
          <CloseButton
            onClick={() => {
              setSearch("");
              toggleIsSearching(false);
            }}
          />
        </InputRightAddon>
        <Button
          size="md"
          py="3"
          ml={1}
          h="100%"
          onClick={searchProducts}
          variant="outline"
        >
          <SearchIcon color="brand.blue" />
        </Button>
      </InputGroup>
    </Box>
  );
};

export default Search;
