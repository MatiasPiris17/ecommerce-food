// eslint-disable-next-line
import {
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
  GET_DETAIL,
  GET_TYPES_OF_DIET,
  POST_RECIPES,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  FILTER_BY_DIET,
  FILTER_CREATED,
} from "./actions-types";
import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const res = (await axios.get("http://localhost:3001/recipes")).data;
      dispatch({ type: GET_RECIPES, payload: res });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
};
export function getTypesOfDiet() {
  return async function (dispatch) {
    try {
      const res = (await axios.get("http://localhost:3001/diets")).data;
      dispatch({ type: GET_TYPES_OF_DIET, payload: res });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
}

export function getRecipeByName(title) {
  return async function (dispatch) {
    try {
      const res = (
        await axios.get(`http://localhost:3001/recipes?name=${title}`)
      ).data;
      dispatch({ type: GET_RECIPES_BY_NAME, payload: res });
    } catch (error) {
      alert("This recipe doesn't exist");
      console.error(error);
    }
  };
}

export function postRecipe(payload) {
  return async function () {
    try {
      const res = await axios.post('http://localhost:3001/recipes/create', payload);
      return { type: POST_RECIPES, res };
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const res = (await axios.get(`http://localhost:3001/recipes/${id}`)).data;
      dispatch({ type: GET_DETAIL, payload: res });
    } catch (error) {
      alert("This recipe does not exist");
      console.error(error);
    }
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}
export function filterRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
