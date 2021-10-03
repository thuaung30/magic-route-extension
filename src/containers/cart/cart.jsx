import React, { useContext } from "react";
import { Stack, Center, Checkbox, useToast } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { StateContext } from "../../background/index";
import MyButton from "../../components/MyButton";
import CartItem from "./components/CartItem";
import { apiUrl } from "../../constants";
import { useQuery } from "react-query";
import axios from "axios";
import { useHistory } from "react-router";
import AuthCheckComponent from "../../hoc/AuthCheck";
import Loading from "../../components/Loading";

const Cart = () => {
  const { state, dispatch } = useContext(StateContext);
  const userId = state.userId;
  const toast = useToast();
  const history = useHistory();

  const plusQuantity = async (id) => {
    try {
      await axios.get(`${apiUrl}/order_delivery/cart/add?id=${id}`);
      dispatch({ type: "plusCartItem" });
    } catch (e) {
      toast({
        title: "Error",
        description: "Error adding quantity",
        status: "error",
        isClosable: true,
        duration: 10000,
        position: "top",
      });
    }
  };

  const minusQuantity = async (id) => {
    try {
      await axios.get(`${apiUrl}/order_delivery/cart/subtract?id=${id}`);
      dispatch({ type: "minusCartItem" });
    } catch (e) {
      toast({
        title: "Error",
        description: "Error subtracting quantity",
        status: "error",
        isClosable: true,
        duration: 10000,
        position: "top",
      });
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/order_delivery/cart?id=${id}`);
      dispatch({ type: "minusCartItem" });
    } catch (e) {
      toast({
        title: "Error",
        description: "Error removing item",
        status: "error",
        isClosable: true,
        duration: 10000,
        position: "top",
      });
    }
  };

  const confirmOrder = async () => {
    try {
      const url = `${apiUrl}/order_delivery/order/v2?userId=${userId}`;
      await axios.post(url, {
        delivery: state.form,
        totalWeight: 10,
        totalSize: 10,
        totalDiscount: 0,
      });
      dispatch({ type: "orderSucces" });
      toast({
        title: "Order",
        description: "Your order was submitted successfully",
        status: "success",
        duration: 1000,
        position: "top",
      });
      history.push("/order");
    } catch (err) {
      toast({
        title: "Order",
        description: "Your order failed to submit. Please try again later.",
        status: "error",
        duration: 1000,
        position: "top",
      });
    }
  };

  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery(["cart", state.changeQuantity], async () => {
    const { data } = await axios.get(
      `${apiUrl}/order_delivery/cart?userId=${userId}`
    );
    return data;
  });

  return (
    <AuthCheckComponent>
      {cartLoading ? (
        <Loading />
      ) : cartError ? (
        <Center mt={200}>Something went wrong.</Center>
      ) : (
        <Stack spacing={1} align="center">
          {!isEmpty(cart) ? (
            [
              cart.map((item, id) => (
                <CartItem
                  key={id}
                  id={item.id}
                  brandName={item.brandName}
                  genericName={item.genericName}
                  form={item.form}
                  strength={item.strength}
                  packaging={item.packaging}
                  quantity={item.quantity}
                  plusQuantity={async () => {
                    await plusQuantity(item.id);
                  }}
                  minusQuantity={async () => {
                    await minusQuantity(item.id);
                  }}
                  removeItem={async () => {
                    await removeItem(item.id);
                  }}
                />
              )),
              <Stack key="temp" align="center" spacing={1}>
                <MyButton handleClick={() => history.push("/delivery")}>
                  {userId && state.form ? (
                    <Checkbox mr={2} isChecked={true} />
                  ) : (
                    <Checkbox mr={2} isChecked={false} />
                  )}{" "}
                  Delivery Destination
                </MyButton>
                <MyButton
                  disabled={!!userId && !state.form}
                  handleClick={async () => await confirmOrder()}
                >
                  Confirm Order
                </MyButton>
              </Stack>,
            ]
          ) : (
            <Center mt={200}>no item</Center>
          )}
        </Stack>
      )}
    </AuthCheckComponent>
  );
};

export default Cart;
