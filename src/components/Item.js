import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const Item = ({ brandName, genericName, form, strength, packaging }) => {
  return (
    <Flex p="2" w="390px" shadow="sm" borderWidth="1px" alignItems="center">
      <Box w="100%">
        <Heading fontSize="md">{brandName}</Heading>
        <Text>{genericName}</Text>
        <Text>{form}</Text>
        <Text>{strength} mg</Text>
        <Text>{packaging}</Text>
      </Box>
    </Flex>
  );
};

export default Item;
