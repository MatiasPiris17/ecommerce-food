import React from "react";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);

  const [orden, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPorPage, setRecipesPorPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPorPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPorPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getRecipes()); // eslint-disable-next-line
  }, [dispatch]);

  //resetar el estado de la receta
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes()); // dispatching the action
  }

  return (
    <div className="homeContainer">
      {/* PRINCIPAL */}
      <div className="nav-home">
        <h2>RECIPE BOOK</h2>
        <SearchBar />
        <div >
          <Link to="/home/create" style={{ color: "black" }}>
            Create Recipe
          </Link>
        </div>
      </div>

      {/* FILTROS */}
      <div className="filtros">
        <div className="filter_AZ">
          <label>ORDER BY A-Z</label>
          <select /*onChange={(e) => handleOrderByName(e)}*/>
            <option>Choose an option</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="filter_score">
          <label>ORDER BY SCORE</label>
          <select /*onChange={(e) => handleOrderByScore(e)}*/>
            <option>Choose an option</option>
            <option value="all">All</option>
            <option value="asc">Highest Score</option>
            <option value="desc">Lowest Score</option>
          </select>
        </div>
        <div className="filter_diet">
          <label>FILTER BY DIET</label>
          <select /*onChange={(e) => handleFilterRecipes(e)}*/>
            <option>Choose an option</option>
            <option value="All">All</option>
            {/* {diets &&
              diets.map((d) => (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              ))} */}
          </select>
        </div>
        <div className="filter_created">
          <label>FILTER BY CREATED</label>
          <select /*onChange={(e) => handleFilterCreated(e)}*/>
            <option>Choose an option</option>
            <option value="all">All</option>
            <option value="db">Data Base</option>
            <option value="api">Api</option>
          </select>
        </div>

        {/* RESET */}
        <button
          className="reset"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          RESET
        </button>
      </div>

      {/* RECETAS */}
      <div>
        {currentRecipes && 
          currentRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
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
          <div>
            <Paginate 
            recipesPorPage={recipesPorPage}
            allRecipes={allRecipes.length}
            paginate={paginate}/>
          </div>


    </div>
  );
}

export default Home;
