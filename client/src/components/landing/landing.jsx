import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.container}>
        <div className={style.item}>
          <h1>PI FOOD</h1>
          <Link to="./home" >
            <button>HOME</button>
          </Link>
        </div>
      </div>
  );
}

export default Landing;
