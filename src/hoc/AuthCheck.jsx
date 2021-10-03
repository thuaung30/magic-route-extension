import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "../util";
import { Box, useToast } from "@chakra-ui/react";
import { StateContext } from "../background";

const AuthCheckComponent = ({ children }) => {
  const { dispatch } = useContext(StateContext);
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const userId = getLocalStorage("userId");
    if (!!userId) {
      dispatch({ type: "login", payload: userId });
    } else {
      toast({
        title: "Please login or restore first.",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      let timer = setTimeout(() => {
        history.push("/user");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [history, toast, dispatch]);

  return <Box>{children}</Box>;
};

export default AuthCheckComponent;
