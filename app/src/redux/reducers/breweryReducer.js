import { createReducer } from "../reducers/reducerUtil";
import { FETCH_BREWERIES } from "../types/breweryTypes";

const initialState = {
  brews: [],
};

export default createReducer(initialState, {});
