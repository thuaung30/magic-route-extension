import { Center, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import InputField from "../../components/InputField";
import { Keypair } from "stellar-base";
import { Server } from "stellar-sdk";
import { setLocalStorage } from "../../util";
import MyButton from "../../components/MyButton";

const Restore = () => {
  const history = useHistory();
  const server = new Server(process.env.REACT_APP_STELLA_SERVER);
  const toast = useToast();

  const authenticate = async (password, secretKey) => {
    try {
      const keyPair = Keypair.fromSecret(secretKey);
      await server.loadAccount(keyPair.publicKey());
      setLocalStorage("magicpassword", password, true);
      setLocalStorage("magicsecretkey", secretKey, true);
      toast({
        title: "Restore Successful!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      history.push("/user");
    } catch (err) {
      toast({
        title: "Invalid Secret key.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ password: "", cPassword: "", secretKey: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.password.length < 8) {
            errors.password = "Too short";
          }
          if (!values.cPassword) {
            errors.cPassword = "Required";
          }
          if (values.password !== values.cPassword) {
            errors.password = "Passwords do not match";
            errors.cPassword = "Passwords do not match";
          }
          if (!values.secretKey) {
            errors.secretKey = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await authenticate(values.password, values.secretKey);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputField name="password" label="Password" password={true} />
            <InputField
              name="cPassword"
              label="Confirm Password"
              password={true}
            />
            <InputField name="secretKey" label="Secret Key" password={true} />
            <MyButton width="full" mt={4} loading={isSubmitting} type="submit">
              Restore
            </MyButton>
          </Form>
        )}
      </Formik>
      <Center mt={2}>
        <Link to="/user">Back</Link>
      </Center>
    </>
  );
};

export default Restore;
