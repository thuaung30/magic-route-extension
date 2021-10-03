import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItemOption,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const OrderMenu = ({ active, setActive }) => {
  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          borderRadius="0px"
          borderWidth="1px"
          w="50%"
          as={Button}
        >
          {active !== "COMPLETED" ? active : "OPEN"}
        </MenuButton>
        <MenuList bg="white" w="50%" boxShadow="off">
          <MenuItemOption onClick={() => setActive("OPEN")}>
            OPEN
          </MenuItemOption>
          <MenuItemOption onClick={() => setActive("CONFIRMED")}>
            CONFIRMED
          </MenuItemOption>
          <MenuItemOption onClick={() => setActive("READY")}>
            READY
          </MenuItemOption>
          <MenuItemOption onClick={() => setActive("DELIVERY")}>
            DELIVERY
          </MenuItemOption>
        </MenuList>
      </Menu>
      <Button
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        borderRadius="0px"
        borderWidth="1px"
        w="50%"
        onClick={() => setActive("COMPLETED")}
      >
        COMPLETED
      </Button>
    </Box>
  );
};

OrderMenu.propTypes = {
  active: PropTypes.string,
  setActive: PropTypes.func,
};

export default OrderMenu;
