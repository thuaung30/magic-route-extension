import { Flex, Heading, Box } from "@chakra-ui/react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      w="100%"
      bg="brand.blue"
      mb={1}
      py={1}
      px={2}
      justify="space-between"
      align="center"
      color="white"
    >
      <Link to="/">
        <Heading _hover={{ cursor: "pointer" }}>Magic Route</Heading>
      </Link>
      <Box>
        <Box display="inline" px="2">
          <Link to="/user">
            <Icon link={true} name="user" />
          </Link>
        </Box>
        <Box display="inline" px="2">
          <Link to="/order">
            <Icon link={true} name="history" />
          </Link>
        </Box>
        <Box display="inline" pl="2">
          <Link to="/cart">
            <Icon link={true} name="shopping cart" />
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
