// eslint-disable-next-line
import {GET_RECIPES, GET_DIETS} from "./actions-types";
import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
        const res = (await axios.get('http://localhost:3001/recipes')).data;
        dispatch({type: GET_RECIPES, payload:res});
    } catch (error) {
        console.error(error);
    }
  };
};

