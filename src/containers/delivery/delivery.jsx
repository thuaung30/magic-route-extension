import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import { Center } from "@chakra-ui/layout";
import TextBox from "../../components/TextBox";
import { StateContext } from "../../background";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import DateField from "../../components/DateField";
import Selector from "../../components/Selector";
import { Checkbox } from "@chakra-ui/checkbox";
import AuthCheckComponent from "../../hoc/AuthCheck";
import MyButton from "../../components/MyButton";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Delivery = () => {
  const [pickupPlace, setPickupPlace] = useState("Ahlone");
  const [deliveryArea, setDeliveryArea] = useState("Ahlone");
  const [deliveryDateAndTime, setDeliveryDateAndTime] = useState(new Date());
  const [promotion, setPromotion] = useState(false);
  const townships = ["Ahlone", "Bahan"];

  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  const regex = /[0-9]+/;
  return (
    <AuthCheckComponent>
      <ArrowBackIcon
        _hover={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
      />
      <Formik
        initialValues={{
          userId: "",
          pickupPlace: "",
          deliveryArea: "",
          deliveryDateAndTime,
          deliveryFee: 2000,
          promotion: 0,
          purchaseAmount: 0,
          pickupPhone: "",
          pickupAddress: "",
          receiverPhone: "",
          receiverName: "",
          deliveryAddress: "",
          deliveryRemark: "",
        }}
        validate={(values) => {
          const errors = {};
          if (values.purchaseAmount <= 0) {
            errors.purchaseAmount = "Must not be 0";
          } else if (!values.pickupPhone) {
            errors.pickupPhone = "Required";
          } else if (!regex.test(values.pickupPhone)) {
            errors.pickupPhone = "Invalid number";
          } else if (!values.pickupAddress) {
            errors.pickupAddress = "Required";
          } else if (!values.receiverPhone) {
            errors.receiverPhone = "Required";
          } else if (!regex.test(values.receiverPhone)) {
            errors.receiverPhone = "Invalid number";
          } else if (!values.receiverName) {
            errors.receiverName = "Required";
          } else if (!values.deliveryAddress) {
            errors.deliveryAddress = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (promotion) {
            values = {
              ...values,
              userId: state.userId,
              pickupPlace,
              deliveryArea,
              deliveryDateAndTime,
              promotion: 500,
            };
          } else {
            values = {
              ...values,
              userId: state.userId,
              pickupPlace,
              deliveryArea,
              deliveryDateAndTime,
            };
          }
          dispatch({ type: "addForm", payload: values });
          setSubmitting(false);
          history.push("/cart");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Selector
              name="pickupPlace"
              label="Pickup Place"
              value={pickupPlace}
              setChange={setPickupPlace}
              options={townships}
            />
            <Selector
              name="deliveryArea"
              label="Delivery Area"
              value={deliveryArea}
              setChange={setDeliveryArea}
              options={townships}
            />
            <DatePicker
              selected={deliveryDateAndTime}
              onChange={(date) => setDeliveryDateAndTime(date)}
              customInput={
                <DateField
                  name="deliveryDateAndTime"
                  label="Delivery Date & Time"
                />
              }
              dateFormat="dd/MM/yy - HH:mm"
              showTimeSelect
            />
            <Checkbox
              my={2}
              isChecked={promotion}
              onChange={() => setPromotion(!promotion)}
            >
              Promotion (Discount 500 Ks)
            </Checkbox>
            <InputField
              name="deliveryFee"
              label="Delivery Fee"
              disabled={true}
            />
            <InputField name="purchaseAmount" label="Purchase Amount" />
            <InputField name="pickupPhone" label="Pickup Phone" />
            <InputField name="pickupAddress" label="Pickup Address" />
            <InputField name="receiverPhone" label="Receiver Phone" />
            <InputField name="receiverName" label="Receiver Name" />
            <InputField name="deliveryAddress" label="Delivery Address" />
            <TextBox name="deliveryRemark" label="Delivery Remark" />
            <Center>
              <MyButton type="submit" loading={isSubmitting}>
                Confirm
              </MyButton>
            </Center>
          </Form>
        )}
      </Formik>
    </AuthCheckComponent>
  );
};

export default Delivery;
