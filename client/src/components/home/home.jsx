//----------------------->Paguina Home/ Paguina Principal<-----------------------
//----------->DESCRIPCION<-----------------------
//SearchBar: un input de búsqueda para encontrar recetas por nombre.
//listado de cards con las recetas, con imagen y nombre dieta
//click a una Card deberá redirigir al detalle de esa receta
//Botones para filtrar por: tipo de dieta / si su origen es de la API o de la base de datos
//Botones para: ordenar a-z p z-a
//Botones para: ordenar por "comida saludable" (health score)
//Paginado:el listado de recetas se hará por partes, debe mostrar un total de 9 recetas por página.

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handbleClick(event) {
    event.preventDefaul();
    dispatch(getRecipes());
  }
  return (
    <div>
      <Link to="/recipes">Crear receta</Link>
      <h1>PI Food</h1>
      <button
        onClick={(res) => {
          handbleClick(res);
        }}>
        Cargar nuevamente todas las recetas
      </button>
      <div>
        
      </div>
    </div>
  );
}
