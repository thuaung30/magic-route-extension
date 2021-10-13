import { Center, Heading, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import InputField from "../../components/InputField";
import MyButton from "../../components/MyButton";
import AuthCheckComponent from "../../hoc/AuthCheck";
import { getLocalStorage } from "../../util";
import {
  Asset,
  BASE_FEE,
  Keypair,
  Networks,
  Operation,
  Server,
  TransactionBuilder,
} from "stellar-sdk";

const Send = () => {
  const [secretKey, setSecretKey] = useState("");
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();
  const assetType = location.state.assetType;
  const issuerId = "GCGEIHL7QV7MSWV56NVN6QOCEYMT4SM7XZ2KL4DJSGSHIRHAGKSIN2U4";
  const server = new Server(process.env.REACT_APP_STELLA_SERVER);

  const sendNonNative = (
    sourceSecretKey,
    destinationAccountId,
    amount,
    assetType
  ) => {
    try {
      const keypair = Keypair.fromSecret(sourceSecretKey);
      const issuerKeypair = Keypair.fromPublicKey(issuerId);
      var asset = new Asset(assetType, issuerKeypair.publicKey());
      server
        .loadAccount(destinationAccountId)
        .catch((error) => {
          toast({
            title: "Destination Account ID doesn't exist.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
        })
        .then(() => {
          return server.loadAccount(keypair.publicKey());
        })
        .then((sourceAccount) => {
          var transaction = new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
          })
            .addOperation(
              Operation.payment({
                destination: destinationAccountId,
                asset: asset,
                amount: amount,
              })
            )
            .setTimeout(180)
            .build();
          transaction.sign(keypair);
          return server.submitTransaction(transaction);
        })
        .then(() => {
          toast({
            title: "Transaction Successful!",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
          history.push("/user");
        })
        .catch((error) => {
          toast({
            title: "Oops! Somthing went wrong.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
          history.push("/user");
        });
    } catch (e) {
      toast({
        title: "Oops! Somthing went wrong.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      history.push("/user");
    }
  };

  const sendNative = (sourceSecretKey, destinationAccountId, amount) => {
    try {
      const keypair = Keypair.fromSecret(sourceSecretKey);
      server
        .loadAccount(destinationAccountId)
        .catch((error) => {
          toast({
            title: "Destination Account ID doesn't exist.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
        })
        .then(() => {
          return server.loadAccount(keypair.publicKey());
        })
        .then((sourceAccount) => {
          var transaction = new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
          })
            .addOperation(
              Operation.payment({
                destination: destinationAccountId,
                asset: Asset.native(),
                amount: amount,
              })
            )
            .setTimeout(180)
            .build();
          transaction.sign(keypair);
          return server.submitTransaction(transaction);
        })
        .then(() => {
          toast({
            title: "Transaction Successful!",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
          history.push("/user");
        })
        .catch((error) => {
          toast({
            title: "Oops! Somthing went wrong.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
          history.push("/user");
        });
    } catch (e) {
      toast({
        title: "Oops! Somthing went wrong.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      history.push("/user");
    }
  };

  useEffect(() => {
    const temp = getLocalStorage("magicsecretkey", true);
    if (!temp) history.push("/user");
    setSecretKey(temp);
  }, [history]);

  return (
    <AuthCheckComponent>
      <Formik
        initialValues={{
          destinationAccountId: "",
          amount: "",
        }}
        validate={({ destinationAccountId, amount }) => {
          const errors = {};
          if (!destinationAccountId) {
            errors.destinationAccountId = "Required";
          }
          if (!amount) {
            errors.amount = "Required";
          }
          return errors;
        }}
        onSubmit={({ destinationAccountId, amount }, { setSubmitting }) => {
          if (assetType === "XLM") {
            sendNative(secretKey, destinationAccountId, amount);
          } else {
            sendNonNative(secretKey, destinationAccountId, amount, assetType);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Heading textAlign="center">{assetType}</Heading>
            <InputField
              name="destinationAccountId"
              label="Destination Account Id"
            />
            <InputField name="amount" label="Amount" />
            <Center>
              <MyButton type="submit" isLoading={isSubmitting}>
                Send
              </MyButton>
            </Center>
            <Center>
              <Link to="/user">Back</Link>
            </Center>
          </Form>
        )}
      </Formik>
    </AuthCheckComponent>
  );
};

export default Send;
