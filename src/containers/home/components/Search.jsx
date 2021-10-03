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
import PropTypes from "prop-types";

const Search = ({
  search,
  setSearch,
  setSearchRes,
  isSearching,
  toggleIsSearching,
  searchProducts,
}) => {
  return (
    <Box w="100%">
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

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
  setSearchRes: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  toggleIsSearching: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,
};

export default Search;
