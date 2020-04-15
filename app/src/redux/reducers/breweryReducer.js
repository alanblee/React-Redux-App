import { createReducer } from "../reducers/reducerUtil";
import { FETCH_BREWERIES } from "../types/breweryTypes";

const initialState = {
  brews: [],
  loading: false,
  errors: "",
};

const fetchBreweries = (state = initialState, payload) => {
  return {
    ...state,
    brews: payload
  }
};
export default createReducer(initialState, {
  [FETCH_BREWERIES]: fetchBreweries,
});
