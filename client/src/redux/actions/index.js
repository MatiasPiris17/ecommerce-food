// eslint-disable-next-line
import { GET_RECIPES, GET_DIETS, GET_RECIPES_BY_NAME, GET_DETAIL,GET_TYPES_OF_DIET, POST_RECIPES } from "./actions-types";
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
  return async function(dispatch) {
    try {
      const res = (await axios.get("http://localhost:3001/diets")).data;
      dispatch({ type: GET_TYPES_OF_DIET, payload: res });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
 }

export function getRecipeByName(name) {
  return async function (dispatch) {
    try {
      const res = (
        await axios.get(`http://localhost:3001/recipes?name=${name}`)
      ).data;
      dispatch({ type: GET_RECIPES_BY_NAME, payload: res });
    } catch (error) {
      alert("This recipe doesn't exist");
      console.error(error);
    }
  };
}

export function postRecipe(payload){
  return async function(){
    try {
      const res = await axios.post('http://localhost:3001/recipes/create', payload)
      return {type:POST_RECIPES, res}
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
}

export function getDetail(id){
  return async function (dispatch) {
    try {
      const res = (await axios.get(`http://localhost:3001/recipes/${id}`)).data
      dispatch({type:GET_DETAIL, payload:res})
    } catch (error) {
      alert('This recipe does not exist');
      console.error(error);
    }
  }
}

