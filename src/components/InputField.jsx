import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import PropTypes from "prop-types";

const InputField = ({ label, password, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl mb={2} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        type={password ? "password" : "text"}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  password: PropTypes.bool,
};

InputField.defaultProps = {
  password: false,
};

export default InputField;
