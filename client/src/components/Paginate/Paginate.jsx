import React from "react";
import style from "./Paginate.module.css"

function Paginate({ recipesPorPage, allRecipes, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPorPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumber?.map((number) => {
          return (
            <div key={number} className={style.pageItem}>
              <a onClick={() => paginate(number)}>
                <button className={style.pageBtn}>{number}</button>
              </a>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginate;
