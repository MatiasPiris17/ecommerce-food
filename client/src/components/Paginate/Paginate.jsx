import React from "react";

function Paginate({ recipesPorPage, allRecipes, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPorPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumber?.map((number) => {
          return (
            <div key={number}>
              <a onClick={() => paginate(number)}>
                <button>{number}</button>
              </a>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginate;
