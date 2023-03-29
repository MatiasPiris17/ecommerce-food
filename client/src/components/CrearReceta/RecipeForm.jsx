import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypesOfDiet, postRecipe } from "../../redux/actions";
import { validationsForm } from "./Validation/validation";
import style from "./RecipeForm.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets: [],
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleCheck = (event) => {
    const { checked, value, name } = event.target;
    if (checked) {
      setInput({
        ...input,
        [name]: [...input.diets, value],
      });
    }
  };
  const handleBlur = (event) => {
    handleChange(event);
    setErrors(validationsForm(input));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postRecipe(input));

    setErrors(validationsForm(input));

    if (Object.keys(errors).length === 0) {
      alert("Recipe created successfully");
      setInput({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        image: "",
      });
      history.push("/home");
    } else {
      alert("Recipe not created");
    }
  };

  return (
    <div className={style.containerForm}>
      <div className={style.form}>
        <h3>CREATE RECIPE</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.formGroup}>
            <div className={style.inputTitle}>
              <label>
                <b>TITLE</b>
              </label>
              <br />
              <input
                className={style.input}
                type="text"
                name="name"
                onBlur={(e) => handleBlur(e)}
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.name && <p>{errors.name}</p>}

            <div className={style.inputSummary}>
              <label>
                <b>SUMMARY</b>
              </label>
              <br />
              <input
                className={style.input}
                type="text"
                name="summary"
                onBlur={(e) => handleBlur(e)}
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.summary && <p>{errors.summary}</p>}
            <div className={style.containerSteps}>
              <label>
                <b>STEPS</b>
              </label>
              <br />
              <input
                className={style.input}
                type="text"
                name="steps"
                value={input.steps}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.steps && <p>{errors.steps}</p>}
            <div className={style.containerDiets}>
              <span>
                <b>TYPE OF DIET</b>
              </span>
              <br />
              {diets.map((diet) => (
                <div key={diet.id}>
                  <label>
                    <input
                      key={diet.id}
                      name={"diets"}
                      value={diet.name}
                      className={style.input}
                      type="checkbox"
                      onBlur={(e) => handleBlur(e)}
                      onChange={(e) => handleCheck(e)}
                    ></input>
                    {diet.name}
                  </label>
                  <br />
                </div>
              ))}
            </div>
            <div className={style.containerScore}>
              <label>
                <b>HEALTH SCORE</b>
              </label>
              <input
                className={style.input}
                type="number"
                name="healthScore"
                value={Number(input.healthScore)}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.healthScore && <p>{errors.healthScore}</p>}
            <div className={style.containerImage}>
              <label>
                <b>IMAGE</b>
              </label>
              <br />
              <input
                type="text"
                name="image"
                onBlur={(e) => handleBlur(e)}
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.image && <p>{errors.image}</p>}
            <div className={style.containerSumit}>
              <button type="submit" className={style.btnCreate}>
                <b>CREATE</b>
              </button>
              <Link to="/home">
                <button className={style.btnHome}>
                  <b>HOME</b>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
