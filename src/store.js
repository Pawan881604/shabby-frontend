import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./lib/redux/reducers/user_reducer";
import { branch_reducer } from "./lib/redux/reducers/branch_reducer";
import { website_reducer } from "lib/redux/reducers/website_reducer";
import {
  offer_reducer,
  offer_slider_reducer,
} from "lib/redux/reducers/offer_reduer";
import alertReducer from "lib/redux/reducers/alertReducer";
import { search_reducer } from "lib/redux/reducers/searchReducer";

const reducer = combineReducers({
  users: userReducer,
  branch: branch_reducer,
  website: website_reducer,
  offers_slider: offer_slider_reducer,
  offers: offer_reducer,
  alert: alertReducer,
  search:search_reducer,
});

let inialState = {
 
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
