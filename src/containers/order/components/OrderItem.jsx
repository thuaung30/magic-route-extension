import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useHistory } from "react-router";
import React from "react";
import PropTypes from "prop-types";
import { convertDate } from "../../../util";

const OrderItem = ({ id, date, status }) => {
  const history = useHistory();
  const parsedDate = convertDate(date, true);
  const url = `/suborder/${status}/${id}`;

  return (
    <Flex
      _hover={{ cursor: "pointer" }}
      onClick={() => history.push(url)}
      p={2}
    >
      <Box>{id}</Box>
      <Spacer />
      <Box>{parsedDate}</Box>
    </Flex>
  );
};

OrderItem.propTypes = {
  id: PropTypes.number,
  date: PropTypes.any,
  status: PropTypes.string,
};

export default OrderItem;
