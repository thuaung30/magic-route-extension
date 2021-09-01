import "./App.css";
import { Box, Heading, Stack } from "@chakra-ui/react";
import Item from "./components/Item";
import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import Paginator from "./components/Paginator";

function App() {
  const [offset, setOffset] = useState(0);
  const url = `https://gateway.thamardaw.com/api/drug/v1.5?offset=${offset}&limit=10`;

  const { data, isLoading, isError } = useQuery(
    ["products", offset],
    async () => {
      const { data } = await axios.get(url);
      return data;
    }
  );

  return (
    <div className="App">
      <Box w="100%" bg="blue.500" mb={2} p={2}>
        <Heading color="white">Magic Route</Heading>
      </Box>
      <Stack spacing={2}>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error...</p>
        ) : isEmpty(data.content) ? (
          <p>Nothing</p>
        ) : (
          <>
            {data.content.map((product) => (
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
              totalPages={data.totalPages}
            />
          </>
        )}
      </Stack>
    </div>
  );
}

export default App;
