import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userReducer} from './lib/redux/reducers/user_reducer'
import { branch_reducer } from "./lib/redux/reducers/branch_reducer";

const reducer = combineReducers({
  users:userReducer,
  branch:branch_reducer
});

let inialState = {
  // cart: {
  //   cartItem: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippinginfo: localStorage.getItem("shippinginfo")
  //     ? JSON.parse(localStorage.getItem("shippinginfo"))
  //     : {},
  // },

  // wishList: {
  //   wishL: localStorage.getItem("wishListItems")
  //     ? JSON.parse(localStorage.getItem("wishListItems"))
  //     : [],
  // },

  // wish: {
  //   cartItem: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippinginfo")
  //     ? JSON.parse(localStorage.getItem("shippinginfo"))
  //     : {},
  // },
};

const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  inialState,
  // applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
