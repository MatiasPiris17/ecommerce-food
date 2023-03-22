import GET_RECIPES from "./actions-types";
import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/recipes');
        dispatch({type: GET_RECIPES, payload:res.data});
    } catch (error) {
        console.error(error);
    }
  };
};

