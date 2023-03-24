import React from "react";
import { Link } from "react-router-dom";

export default function RecipeDetail(props) {

  
  return (
    <div className="container">
      <h1>Detalle de receta</h1>
      <Link to="/home" >
        <button>
          Ingresar al menú
        </button>
      </Link>
    </div>
  );
};