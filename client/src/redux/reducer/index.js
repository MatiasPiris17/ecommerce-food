import { GET_RECIPES } from "../actions/actions-types";

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
// DEMAS ACCIONES

      default:
        return state;
  }
};

export default rootReducer;
