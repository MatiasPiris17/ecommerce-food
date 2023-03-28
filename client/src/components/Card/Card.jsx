import React from "react";
import { Link } from "react-router-dom";

function Card({ name, diets, image, score, id }) {
  return (
    <div>
      <div>
        <img src={image} alt={name} width="200px" height="250px" />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <h3>{diets}</h3>
      </div>
      <div>
        <h3>Health Score: {score}</h3>
      </div>
      <div>
        <Link to={`/recipe/${id}`} style={{ textDecoration: "none" }}>
          <button>See more</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
