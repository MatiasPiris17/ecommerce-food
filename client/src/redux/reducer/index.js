import { GET_RECIPES } from "../actions/actions-types";

const initialState = {
  recipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
  }
};

export default rootReducer;
