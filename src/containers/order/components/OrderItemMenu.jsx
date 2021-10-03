import { Box, Flex, Spacer } from "@chakra-ui/react";

const OrderItemMenu = () => {
  return (
    <Flex p={1} borderBottom="1px">
      <Box fontWeight="bold">Order Id</Box>
      <Spacer />
      <Box fontWeight="bold">Date</Box>
    </Flex>
  );
};

export default OrderItemMenu;
