import { createContext } from "react";
// If your extension doesn't need a background script, just leave this file empty

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  console.log("I can run your javascript like any other code in your project");
  console.log("just do not forget, I cannot render anything !");
}

//initial state
export const initialState = {
  cart: [],
  count: 0,
  form: null,
  userId: null,
  temp: null,
  error: null,
  changeQuantity: false,
};

//reducer function to use in useReducer in _app.tsx
export function reducer(state, action) {
  switch (action.type) {
    //click add on landing page
    case "addToCart":
      return {
        ...state,
        count: state.cart.push(action.payload),
      };
    //add quantity to one item in cart
    case "plusCartItem":
      return {
        ...state,
        changeQuantity: !state.changeQuantity,
      };
    //subtract quantity from one item in cart
    case "minusCartItem":
      return {
        ...state,
        changeQuantity: !state.changeQuantity,
        // temp: state.cart.forEach((item) => {
        //   if (item.brandName === action.payload) {
        //     item.quantity -= 1;
        //   }
        // }),
      };
    //remove one item from cart
    case "removeCartItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.brandName !== action.payload),
        count: state.count - 1,
      };
    //confirm form
    case "addForm":
      return { ...state, form: action.payload };
    //reset state after successful order
    case "orderSuccess":
      return { ...state, cart: [], count: 0, form: null, changeQuantity: 0 };
    //set error if order submit fails
    case "orderError":
      return { ...state, error: action.payload };
    //login state
    case "login":
      return { ...state, userId: action.payload };
    //logout state
    case "logout":
      return { ...state, cart: [], count: 0, form: null, userId: null };
    default:
      return state;
  }
}

// T: <any> here because also need to pass dispatch from useReducer
export const StateContext = createContext(initialState);
