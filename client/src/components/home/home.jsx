import React from "react";
import { useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import "./Home.css";


function Home() {
  const dispatch = useDispatch();
  // const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes()); // eslint-disable-next-line
  }, []);

  function handbleClick(event) {
    event.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div className="homeContainer">


      
      {/* PRINCIPAL */}
      <div className="nav-home">
        <h2>RECIPE BOOK</h2>
        {/* <SearchBar /> */}
        <div className="create">
          <Link to="/created" style={{ color: "black" }}>
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
          <select /*onChange={(e) => handleFilterRecipes(e)}*/ >
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
        </div >

        {/* RESET */}
        <button className="reset" onClick={(e) => {handbleClick(e)}}  >
          RESET
        </button>
      </div>


      {/* RECETAS */}
      {/* <div className="container-card">
        {currentRecipes && currentRecipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              name={recipe.title}
              diets={
                recipe.createDb
                  ? recipe.TypeDiets
                  : recipe.diets
              }
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
        }) }
      </div> */}


    {/* PAGUINADO */}
    {/* <div className='container_pag'>
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div> */}


    </div>
  );
}

export default Home;
