import React from "react";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  orderByName,
  orderByScore,
  filterRecipesByDiet,
  getTypesOfDiet,
  filterCreated,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);

  const [orden, setOrder] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1); //número de página actual
  const [recipesPorPage, setRecipesPorPage] = useState(9);//la cantidad de recetas que se muestran
  const indexOfLastRecipe = currentPage * recipesPorPage; //se calcula el índice de la última receta
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPorPage; //se calcula el índice de la primera receta
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );//se obtiene un subconjunto de recetas del arreglo allRecipes
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // toma un número de página como argumento y actualiza el estado de currentPage con ese número

  useEffect(() => { //Imprime todas las recetas
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => { //Imprime todas las dietas
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  //resetar el estado de la receta
  function handleClick(event) {
    event.preventDefault(); // previene el comportamiento predeterminado del evento
    dispatch(getRecipes()); // dispatching the action
  }

  function handleOrderByName(event) {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1); //la página se reinicie en 1
    setOrder(event.target.value);
  }
  function handleOrderByScore(event) {
    event.preventDefault(); 
    dispatch(orderByScore(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }
  function handleFilterRecipes(event) {
    dispatch(filterRecipesByDiet(event.target.value));
  }
  function handleFilterCreated(event) {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
  }

  return (
    <div className={style.homeContainer}>
      {/* PRINCIPAL */}
      <div className={style.navHome}>
        <h2>PI FOOD</h2>
        <SearchBar />
        <div>
          <Link to="/home/create">
           <button>CREATE RECIPE</button> 
          </Link>
        </div>
      </div>

      {/* FILTROS */}
      <div className={style.filters}>
        <div className={style.filterAZ}>
          <label>ORDER BY A-Z</label>
          <select onChange={(e) => handleOrderByName(e)}>
            <option disabled selected>Choose an option</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className={style.filterScore}>
          <label>ORDER BY SCORE</label>
          <select onChange={(e) => handleOrderByScore(e)}>
            <option disabled selected>Choose an option</option>
            <option value="asc">Highest Score</option>
            <option value="desc">Lowest Score</option>
          </select>
        </div>
        <div className={style.filterDiet}>
          <label>FILTER BY DIET</label>
          <select onChange={(e) => handleFilterRecipes(e)}>
            <option disabled selected>Choose an option</option>
            <option value="All">All</option>
            {diets &&
              diets.map((d) => (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>
        <div className={style.filterCreated}>
          <label>FILTER BY CREATED</label>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option disabled selected>Choose an option</option>
            <option value="all">All</option>
            <option value="db">Data Base</option>
            <option value="api">Api</option>
          </select>
        </div>

        {/* RESET */}
        <button
         className={style.reset}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          RESET
        </button>
      </div>

      {/* RECETAS */} 
      <div className={style.recipesContainer}>
        {currentRecipes &&
          currentRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                diets={recipe.diets}
                image={
                  recipe.image ? (
                    recipe.image
                  ) : (
                    <image src="../../../../cooking.png" alt="recipe" />
                  )
                }
                score={recipe.healthScore}
              />
            );
          })}
      </div>

      {/* PAGUINADO */}
      <div className={style.paginate}>
        <Paginate // Se pasan los valores por pros
          recipesPorPage={recipesPorPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Home;
