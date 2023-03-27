import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setName(value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getRecipeByName(name));
    setName("");
  }
  useEffect(() => {
    dispatch(getRecipeByName(name));
  }, [dispatch, name]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onSubmit={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
