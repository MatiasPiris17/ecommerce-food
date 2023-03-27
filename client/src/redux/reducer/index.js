import { GET_RECIPES, GET_RECIPES_BY_NAME } from "../actions/actions-types";

const initialState = {
  recipes: [],
  allRecipes:[],
  diets:[],
  detail:{}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes:action.payload,
      };
// case GET_TYPES_OF_DIET:
      case GET_RECIPES_BY_NAME:
        return{
          ...state,
          recipes:action.payload
        }

      default:
        return state;
  }
};

export default rootReducer;
