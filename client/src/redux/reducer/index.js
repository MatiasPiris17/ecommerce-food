import {
  GET_DETAIL,
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
} from "../actions/actions-types";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
