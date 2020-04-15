import { combineReducers } from "redux";
import breweryReducer from "./breweryReducer";

const rootReducer = combineReducers({
  brewery: breweryReducer,
});

export default rootReducer;
