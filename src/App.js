import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useReducer, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/home/home";
import User from "./containers/user/user";
import Cart from "./containers/cart/cart";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Restore from "./containers/restore/restore";
import { reducer, initialState, StateContext } from "./background";
import Delivery from "./containers/delivery/delivery";
import Order from "./containers/order/order";
import SubOrder from "./containers/order/sub_order";
import Send from "./containers/send/send";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //for performance
  const providerValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <StateContext.Provider value={providerValue}>
      <Router>
        <Navbar />
        <div className="App">
          <Wrapper>
            <Switch>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/send">
                <Send />
              </Route>
              <Route path="/restore">
                <Restore />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/delivery">
                <Delivery />
              </Route>
              <Route path="/order">
                <Order />
              </Route>
              <Route path="/suborder/:status/:oid">
                <SubOrder />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
