import React from "react";
import {
  Box,
  Checkbox,
  Heading,
  Stack,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import { convertDate } from "../../util";
import { useHistory, useParams } from "react-router";
import { apiUrl } from "../../constants";
import { ArrowBackIcon } from "@chakra-ui/icons";

const SubOrder = () => {
  const history = useHistory();
  const { status, oid } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["order", status, oid],
    async () => {
      const url = `${apiUrl}/order_delivery/order/one?id=${oid}`;
      const response = await axios.get(url);
      return response.data;
    }
  );

  return (
    <>
      <ArrowBackIcon
        _hover={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
      />
      {isLoading ? (
        <Center mt={200}>
          <Spinner />
        </Center>
      ) : isError ? (
        <Center mt={200}>Something went wrong. :(</Center>
      ) : (
        data &&
        !isEmpty(data) && (
          <Stack mb={1} spacing={1}>
            <Heading size="lg">Order Info</Heading>
            <Box p={1} w="100%" shadow="sm" borderWidth="1px" borderRadius="md">
              <Heading size="md">Order - {oid}</Heading>
              <Text fontSize="l">UserId - {data.userId}</Text>
              <Text fontSize="l">
                Date & Time - {convertDate(data.date, true)}
              </Text>
              <Text fontSize="l">Status - {status}</Text>
              {status !== "OPEN" && (
                <Text fontSize="l">
                  Total - {data.totalPrice.toLocaleString()}
                </Text>
              )}
              {status === "Completed" && (
                <Checkbox colorScheme="green" defaultIsChecked>
                  Payment
                </Checkbox>
              )}
            </Box>
            <Heading size="lg">Order Items</Heading>
            {data.orderItems.map((item, id) => (
              <Box
                key={id}
                p={1}
                w="100%"
                shadow="sm"
                borderWidth="1px"
                borderRadius="md"
              >
                <Heading size="md">{item.brandName}</Heading>
                <Text fontSize="l">{item.genericName}</Text>
                <Text fontSize="l">{item.form}</Text>
                <Text fontSize="l">{item.strength}</Text>
                <Text fontSize="l">{item.packaging}</Text>
                <Text fontSize="l">Quantity - {item.quantity}</Text>
                {status !== "Open" && (
                  <Text fontSize="l">
                    Price - {item.price.toLocaleString()} MMK
                  </Text>
                )}
                {status !== "Open" && (
                  <Text fontSize="l">
                    Subtotal - {item.subtotal.toLocaleString()} MMK
                  </Text>
                )}
              </Box>
            ))}
            <Heading size="lg">Delivery Info</Heading>
            {data.delivery && !isEmpty(data.delivery) && (
              <Box
                p={1}
                w="100%"
                shadow="sm"
                borderWidth="1px"
                borderRadius="md"
              >
                <Heading size="md">Delivery Id - {data.delivery.id}</Heading>
                <Text>User Id - {data.delivery.userId}</Text>
                <Text>Pickup Place - {data.delivery.pickupPlace}</Text>
                <Text>Delivery Area - {data.delivery.deliveryArea}</Text>
                <Text>
                  Delivery Date & Time -{" "}
                  {convertDate(data.delivery.deliveryDateAndTime, false)}
                </Text>
                <Text>Promotion - {data.delivery.promotion}</Text>
                <Text>Pickup Phone - {data.delivery.pickupPhone}</Text>
                <Text>Pickup Address - {data.delivery.pickupAddress}</Text>
                <Text>Receiver Name - {data.delivery.receiverName}</Text>
                <Text>Receiver Phone - {data.delivery.receiverPhone}</Text>
                <Text>Delivery Address - {data.delivery.deliveryAddress}</Text>
                <Text>Delivery Address - {data.delivery.deliveryAddress}</Text>
                {data.delivery.deliveryRemark && (
                  <Text>Delivery Remark - {data.delivery.deliveryRemark}</Text>
                )}
                <Text>Delivery Fee - {data.delivery.deliveryFee}</Text>
                <Text>Delivery Status - {data.delivery.status}</Text>
              </Box>
            )}
          </Stack>
        )
      )}
    </>
  );
};

export default SubOrder;
