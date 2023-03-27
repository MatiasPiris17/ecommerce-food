// eslint-disable-next-line
import { GET_RECIPES, GET_DIETS, GET_RECIPES_BY_NAME } from "./actions-types";
import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const res = (await axios.get("http://localhost:3001/recipes")).data;
      dispatch({ type: GET_RECIPES, payload: res });
    } catch (error) {
      console.error(error);
    }
  };
};
// export function getTypesOfDiet() {}

export function getRecipeByName (name) {
  return async function (dispatch){
    try {
      const res = (await axios.get(`http://localhost:3001/recipes?name=${name}`)).data
      dispatch({type:GET_RECIPES_BY_NAME, payload:res})
    } catch (error) {
      console.error(error);
    }
  }
}


