import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const MyButton = ({
  children,
  type,
  width,
  loading = false,
  disabled = false,
  handleClick,
}) => {
  return (
    <Button
      type={type && type}
      width={width && width}
      _hover={{ bg: "blue.600" }}
      _active={{ bg: "blue.700" }}
      outline="none"
      size="md"
      bg="brand.blue"
      color="white"
      onClick={handleClick}
      isLoading={loading}
      isDisabled={disabled}
    >
      {children}
    </Button>
  );
};

MyButton.propTypes = {
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MyButton;
