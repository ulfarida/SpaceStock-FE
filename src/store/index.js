import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./home";
import detailReducer from "./detail";

const rootReducer = combineReducers({
  home: homeReducer,
  detail: detailReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;