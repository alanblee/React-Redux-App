import axios from "axios";
import { FETCH_BREWERIES } from "../types/breweryTypes";

export const fetchBreweries = (input) => async (dispatch) => {
  try {
    const brewData = await axios.get(
      `https://api.openbrewerydb.org/breweries?by_city=${input}`
    );
    dispatch({ type: FETCH_BREWERIES, payload: brewData.data });
  } catch (err) {
    console.log(err.message);
  }
};
