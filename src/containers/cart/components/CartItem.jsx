import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  Image,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React from "react";
import PropTypes from "prop-types";

const CartItem = ({
  id,
  brandName,
  genericName,
  form,
  strength,
  packaging,
  quantity,
  plusQuantity,
  minusQuantity,
  removeItem,
}) => {
  return (
    <Flex
      px={2}
      py={1}
      w="100%"
      shadow="sm"
      borderWidth="1px"
      alignItems="center"
    >
      <Box>
        <Heading fontSize="md">{brandName}</Heading>
        <Text>{genericName}</Text>
        <Text>{form}</Text>
        <Text>{strength}</Text>
        <Text>{packaging}</Text>
        {/* <Text mt={2}>Subtotal - {(quantity * 1000).toLocaleString()} MMK</Text> */}
      </Box>
      <Spacer />
      <Flex overflowX="auto" justify="center" align="center" flexDir="column">
        <Image src="https://i.imgur.com/1WybYXs.jpg" boxSize="50px" />
        <Center>
          <Flex
            flexDirection="row"
            justifyContent="space-around"
            shadow="sm"
            borderWidth="1px"
            borderRadius="10px"
            width="80px"
          >
            <IconButton
              display="inline"
              size="xs"
              bg="brand.blue"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              aria-label="Increase quantity"
              color="white"
              icon={<AddIcon />}
              onClick={plusQuantity}
            />
            <Box bg="white" display="inline" width="50%" textAlign="center">
              {quantity}
            </Box>
            <IconButton
              display="inline"
              size="xs"
              bg="brand.blue"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              aria-label="Decrease quantity"
              color="white"
              icon={<MinusIcon />}
              onClick={quantity > 1 ? minusQuantity : removeItem}
            />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  brandName: PropTypes.string,
  genericName: PropTypes.string,
  form: PropTypes.string,
  strength: PropTypes.string,
  packaging: PropTypes.string,
  quantity: PropTypes.number,
  plusQuantity: PropTypes.func,
  minusQuantity: PropTypes.func,
  removeItem: PropTypes.func,
};

export default CartItem;
