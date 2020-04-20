import { combineReducers } from "redux";
import breweryReducer from "./breweryReducer";

const rootReducer = combineReducers({
  breweryData: breweryReducer,
});

export default rootReducer;
