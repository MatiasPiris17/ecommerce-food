//----------------------->Formulario para crear una nueva receta<-----------------------
//----------->DESCRIPCION<-----------------------
//debe ser controlado completamente con JavaScritp
// Debe contar con los siguientes campos:
// Nombre.
// Resumen del plato.
// Nivel de comida saludable (health score).
// Paso a paso.
// Imagen.
// Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
// Botón para crear la receta.
import React from "react";
import { Link } from "react-router-dom";

export default function Form() {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#F8F8F8",
    borderRadius: "10px",
    boxShadow: "1px 1px 2px #BBBBBB",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#4F4F4F",
    textShadow: "1px 1px #F5F5F5",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "none",
    boxShadow: "1px 1px 2px #BBBBBB",
  };

  const submitStyle = {
    width: "50%",
    padding: "1rem",
    backgroundColor: "#4F4F4F",
    color: "#F8F8F8",
    borderRadius: "10px",
    border: "none",
    boxShadow: "1px 1px 2px #BBBBBB",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  };

  const submitHoverStyle = {
    backgroundColor: "#3E3E3E",
    transform: "scale(1.05)",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <form style={formStyle}>
        <h1 style={titleStyle}>Recipe Created</h1>
        <input style={inputStyle} type="text" placeholder="Title" />
        <input style={inputStyle} type="text" placeholder="Summary" />
        <input style={inputStyle} type="text" placeholder="Image URL" />
        <input style={inputStyle} type="number" placeholder="Score" />
        <button
          style={submitStyle}
          onMouseEnter={(e) => (e.target.style = { ...submitStyle, ...submitHoverStyle })}
          onMouseLeave={(e) => (e.target.style = submitStyle)}
        >
          Submit
        </button>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <button style={{ marginTop: "1rem" }}>Back to Menu</button>
        </Link>
      </form>
    </div>
  );
}
