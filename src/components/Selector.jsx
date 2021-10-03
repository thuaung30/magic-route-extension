import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const Selector = ({ options, label, name, value, setChange }) => {
  return (
    <FormControl mb={2}>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value}
        id={name}
        onChange={(e) => setChange(e.target.value)}
      >
        {options.map((option, key) => (
          <option key={key} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  setChange: PropTypes.func,
};

export default Selector;
