import "./App.css";
import { Box, Heading, Stack } from "@chakra-ui/react";
import Item from "./components/Item";
import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import Paginator from "./components/Paginator";
import Search from "./components/Search";

function App() {
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isSearching, toggleIsSearching] = useState(false);
  const [offset, setOffset] = useState(0);

  const url = `https://gateway.thamardaw.com/api/drug/v1.5?offset=${offset}&limit=4`;

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery(["products", offset], async () => {
    const { data } = await axios.get(url);
    return data;
  });

  const {
    refetch,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery(
    "searchProducts",
    async () => {
      const response = await axios.get(
        `https://gateway.thamardaw.com/api/drug/v1.5/search?brand=${search}`
      );
      setSearchRes(response.data);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: false, retry: false }
  );

  const handleClick = () => {
    refetch();
  };

  return (
    <div className="App">
      <Box w="100%" bg="brand.blue" mb={1} p={2}>
        <Heading color="white">Magic Route</Heading>
      </Box>
      <Stack spacing={1}>
        <Search
          search={search}
          setSearch={setSearch}
          setSearchRes={setSearchRes}
          isSearching={isSearching}
          toggleIsSearching={toggleIsSearching}
          searchProducts={handleClick}
        />
        {isSearching ? (
          searchLoading ? (
            <p>Loading...</p>
          ) : searchError ? (
            <p>Error</p>
          ) : (
            searchRes?.map((item) => (
              <Item
                key={item.id}
                brandName={item.brandName}
                genericName={item.genericName}
                form={item.form}
                strength={item.strength}
                packaging={item.packaging}
              />
            ))
          )
        ) : productsLoading ? (
          <p>Loading...</p>
        ) : productsError ? (
          <p>Error...</p>
        ) : isEmpty(products.content) ? (
          <p>Nothing</p>
        ) : (
          <>
            {products.content.map((product) => (
              <Item
                key={product.id}
                brandName={product.brandName}
                genericName={product.genericName}
                form={product.form}
                strength={product.strength}
                packaging={product.packaging}
              />
            ))}
            <Paginator
              offset={offset}
              setOffset={setOffset}
              totalPages={products.totalPages}
            />
          </>
        )}
      </Stack>
    </div>
  );
}

export default App;
