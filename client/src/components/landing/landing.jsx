import React from "react";
import { Link } from "react-router-dom";

export default function Landing () {
  return (
    <div>
      <h1>PI Food</h1>
      <Link to="/home">
        <button>Ingresar al menú</button>
      </Link>
    </div>
  );
};

// export default Landing;
