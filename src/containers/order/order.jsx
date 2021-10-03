import { Stack } from "@chakra-ui/layout";
import OrderItemMenu from "./components/OrderItemMenu";
import AuthCheckComponent from "../../hoc/AuthCheck";
import OrderMenu from "./components/OrderMenu";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import Filler from "../../components/Filler";
import { isEmpty } from "lodash-es";
import OrderItem from "./components/OrderItem";
import { apiUrl } from "../../constants";
import { StateContext } from "../../background";

const Order = () => {
  const { state } = useContext(StateContext);
  const [active, setActive] = useState("OPEN");
  const userId = state.userId;

  const { isLoading, isError, data } = useQuery(
    ["orders", active],
    async () => {
      const response = await axios.get(
        `${apiUrl}/order_delivery/order?status=${active}&userId=${userId}`
      );
      return response.data;
    }
  );

  return (
    <AuthCheckComponent>
      <Stack p={1} spacing={1}>
        <OrderMenu active={active} setActive={setActive} />
        <OrderItemMenu />
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Filler>Something went wrong.</Filler>
        ) : (
          data &&
          !isEmpty(data) &&
          data.map((item, id) => (
            <OrderItem key={id} id={item.id} date={item.date} status={active} />
          ))
        )}
      </Stack>
    </AuthCheckComponent>
  );
};

export default Order;
