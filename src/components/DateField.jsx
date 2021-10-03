import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
// import PropTypes from "prop-types";

const DateField = (props, ref) => {
  return (
    <FormControl mb={2}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input
        onChange={(e) => props.setChange(e.target.value)}
        disabled={props.disabled}
        value={props.value}
        onClick={props.onClick}
      />
    </FormControl>
  );
};

// DateField.propTypes = {
//   name: PropTypes.string,
//   label: PropTypes.string,
//   value: PropTypes.any,
//   setChange: PropTypes.func,
//   disabled: PropTypes.bool,
//   onClick: PropTypes.func,
// };

export default React.forwardRef(DateField);
