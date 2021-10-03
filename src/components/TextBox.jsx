import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import PropTypes from "prop-types";

const TextBox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControl mb={2}>
      <FormLabel>{label}</FormLabel>
      <Textarea {...field} {...props} />
    </FormControl>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default TextBox;
