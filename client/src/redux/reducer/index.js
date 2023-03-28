import {
  FILTER_BY_DIET,
  FILTER_CREATED,
  GET_DETAIL,
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
  GET_TYPES_OF_DIET,
  ORDER_BY_NAME,
  POST_RECIPES,
  ORDER_BY_SCORE
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
    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case POST_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ORDER_BY_NAME:
      let order =
        action.payload === "A-Z"
          ? state.recipes.sort((a, b) => {
              if (a.name.toLowerCase().localeCompare(b.name.toLowerCase())) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return { ...state, recipes: order };
    case FILTER_BY_DIET:
      const allInfo = state.allRecipes;
      const filteredRecipes =
        action.payload === "All"
          ? allInfo
          : allInfo.filter((recipe) =>
              recipe?.diets?.includes(`${action.payload}, `)
            );
      return {
        ...state,
        recipes: filteredRecipes,
      };
    case FILTER_CREATED:
      const allData = state.allRecipes;
      const createdFilter =
        action.payload === "db"
          ? allData.filter((recipe) => recipe.createdInDb)
          : allData.filter((recipe) => !recipe.createdInDb);
      return {
        ...state,
        recipes: action.payload === "all" ? allData : createdFilter,
      };
      case ORDER_BY_SCORE:
        let orderScore = action.payload === "asc"
        ? state.recipes.sort((a,b) => {
          if (a.healthScore > b.healthScore) return -1
          if(b.healthScore > a.healthScore) return 1
          return 0
      }) : state.recipes.sort((a,b)=> {
        if(a.healthScore > b.healthScore) return 1
        if(b.healthScore > a.healthScore) return -1
        return 0
      }) 
      return {
        ...state,
        recipes: action.payload === "asc" ? state.allRecipes:orderScore,
      }

    default:
      return state;
  }
};

export default rootReducer;
