import { Box } from "@chakra-ui/layout";
import PropTypes from "prop-types";

const Wrapper = ({ children }) => {
  return <Box width="390px">{children}</Box>;
};

Wrapper.propTypes = {
  children: PropTypes.element,
};

export default Wrapper;
