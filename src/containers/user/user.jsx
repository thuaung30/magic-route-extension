import {
  Button,
  Center,
  useToast,
  Flex,
  Container,
  Text,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useCallback, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Keypair } from "stellar-base";
import { Server } from "stellar-sdk";
import InputField from "../../components/InputField";
import Loading from "../../components/Loading";
import { decrypt, getLocalStorage, setLocalStorage } from "../../util";
import BalanceCard from "./components/BalanceCard";
import { StateContext } from "../../background";
import MyButton from "../../components/MyButton";

const User = () => {
  const { dispatch } = useContext(StateContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState([]);
  const [publicKey, setPublicKey] = useState("");
  const toast = useToast();

  const login = async (password) => {
    const storedPassword = localStorage.getItem("magicpassword");
    if (storedPassword == null) {
      toast({
        title: "Please restore a account first.",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else {
      const decryptedPassword = decrypt(storedPassword);
      const secret = getLocalStorage("magicsecretkey", true);
      if (password === decryptedPassword && secret !== null) {
        await getAccountInfo(secret);
      } else {
        toast({
          title: "Wrong password!",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const getAccountInfo = useCallback(
    async (secret) => {
      try {
        setLoading(true);
        const server = new Server(process.env.REACT_APP_STELLA_SERVER);
        const keyPair = Keypair.fromSecret(secret);
        const response = await server.loadAccount(keyPair.publicKey());
        setLoginStatus(true);
        setLocalStorage("logout", false);
        setLocalStorage("userId", keyPair.publicKey());
        dispatch({ type: "login", payload: keyPair.publicKey() });
        setPublicKey(keyPair.publicKey());
        setBalances(response.balances);
        setLoading(false);
      } catch {
        toast({
          title: "Invalid Secret Key.",
          description: "Please restore key.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        setLoginStatus(false);
      }
    },
    [toast, dispatch]
  );

  const logOut = () => {
    localStorage.removeItem("userId");
    setLocalStorage("logout", true);
    setLoginStatus(false);
    dispatch({ type: "logout" });
  };

  useEffect(() => {
    const password = getLocalStorage("magicpassword", true);
    const secretKey = getLocalStorage("magicsecretkey", true);
    const userId = getLocalStorage("userId");
    const logout = JSON.parse(getLocalStorage("logout"));
    if (password && secretKey && userId && !logout) {
      getAccountInfo(secretKey);
    }
  }, [getAccountInfo]);

  if (loading) {
    return <Loading />;
  } else if (loginStatus && balances.length > 0) {
    return (
      <>
        <Flex p={5} w="100%" alignItems="center">
          <Container width={200} padding={0} margin={0}>
            <Text>Accound ID : </Text>
          </Container>
          <Spacer />
          <Text noOfLines={[1, 2]}>{publicKey}</Text>
          <Center>
            <Button padding={0}>
              <Icon name="check" />
            </Button>
          </Center>
        </Flex>
        {balances.length === 0 ? (
          <Loading />
        ) : (
          balances.map((balance, index) => (
            <BalanceCard
              key={index}
              balance={balance.balance}
              asset_code={
                balance.asset_type === "native" ? "XLM" : balance.asset_code
              }
            />
          ))
        )}
        <Center mt={2}>
          <MyButton handleClick={logOut}>Logout</MyButton>
        </Center>
        <Center mt={2}>
          <Link to="/restore">Restore</Link>
        </Center>
      </>
    );
  } else {
    return (
      <>
        <Formik
          initialValues={{ password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            login(values.password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="password" label="Password" password={true} />
              <Center mt={4}>
                <MyButton width="full" loading={isSubmitting} type="submit">
                  Login
                </MyButton>
              </Center>
            </Form>
          )}
        </Formik>
        <Center mt={2}>
          <Link to="/restore">Restore</Link>
        </Center>
      </>
    );
  }
};

export default User;
