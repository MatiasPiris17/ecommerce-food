import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setName(value);
  }
  useEffect(() => {
    dispatch(getRecipeByName(name));
  }, [dispatch, name]);

  return (
    <div className={style.search}>
      <input
      className={style.searchInput}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}

export default SearchBar;
