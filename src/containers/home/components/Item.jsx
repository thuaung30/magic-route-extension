import {
  Flex,
  Box,
  Heading,
  Text,
  useToast,
  Spacer,
  Image,
  Center,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getLocalStorage } from "../../../util";
import { useContext } from "react";
import { StateContext } from "../../../background";
import { useHistory } from "react-router";
import axios from "axios";
import MyButton from "../../../components/MyButton";

const Item = ({ brandName, genericName, form, strength, packaging }) => {
  const history = useHistory();
  const toast = useToast();
  const { dispatch } = useContext(StateContext);
  const userId = getLocalStorage("userId");
  const data = {
    userId,
    brandName,
    genericName,
    form,
    strength,
    packaging,
    quantity: 1,
    discount: 0,
    bonus: 0,
  };

  const url = `${process.env.REACT_APP_API_URL}/api/order_delivery/cart`;

  /***
   * @description: check for account id, if exists, proceed to add to cart, if not, redirect to login
   * @param: quantity
   * @return: void
   ***/
  const addToCart = async () => {
    if (userId) {
      const response = await axios.post(url, data);
      dispatch({ type: "addToCart", response });
    } else {
      toast({
        title: "Login",
        description: "Please login first",
        status: "warning",
        isClosable: true,
        duration: 1000,
        position: "top",
      });
      history.push("/user");
    }
  };

  return (
    <Flex
      w="100%"
      px={2}
      py={1}
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
      </Box>
      <Spacer />
      <Flex overflowX="auto" justify="center" align="center" flexDir="column">
        <Image src="https://i.imgur.com/1WybYXs.jpg" boxSize="50px" />
        <Center>
          {/* {inCart ? (
            <Button width={20} disabled>
              Added
            </Button>
          ) : (
          )} */}
          <MyButton width={20} handleClick={() => addToCart(1)}>
            Add
          </MyButton>
        </Center>
      </Flex>
    </Flex>
  );
};

Item.propTypes = {
  brandName: PropTypes.string,
  genericName: PropTypes.string,
  form: PropTypes.string,
  strength: PropTypes.string,
  packaging: PropTypes.string,
};

export default Item;
