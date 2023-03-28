import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Card({ name, diets, image, score, id }) {
  return (
    <div className={style.card}>
      <div className={style.imgContainer}>
        <img src={image} alt={name} width="200px" height="250px" />
      </div>
      <div className={style.cardInfo}>
        <h3>{name}</h3>
      </div>
      <div className={style.itemCard}>
        <p>{diets}</p>
      </div>
      <div className={style.itemScore}>
        <p>Health Score: {score}</p>
      </div>
      <div className={style.btn}>
        <Link to={`/recipe/${id}`} style={{ textDecoration: "none" }}>
          <button className={style.btn}>See more</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
