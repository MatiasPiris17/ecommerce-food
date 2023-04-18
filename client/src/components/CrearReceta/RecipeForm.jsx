import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypesOfDiet, postRecipe } from "../../redux/actions";
import style from "./RecipeForm.module.css";

const validationsForm = (input) => {
  let errors = {};

  let regexString = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/

  if (!input.title || !input.title.trim()) {
    errors.title = "Title is required";
  } else if (!regexString.test(input.title.trim())) {
    errors.title = "Title must be only letters";
  } else if (input.title.length > 80 || input.title.length < 3) {
    errors.title = "Title must be between 3 and 80 characters";
  }

  if (!input.summary || !input.summary.trim()) {
    errors.summary = "Summary is required";
  } else if (!regexString.test(input.summary.trim())) {
    errors.summary = "Summary must be only letters";
  } else if (input.summary.length > 255 || input.summary.length < 3) {
    errors.summary = "Summary must be between 3 and 255 characters";
  }

  if (!input.healthScore) {
    errors.healthScore = "HealthScore is required";
  } else if (!Number.isInteger(Number(input.healthScore))) {
    errors.healthScore = "HealthScore must be an integer";
  } else if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "HealthScore must be between 1 and 100";
  }

  if (!input.instructions || !input.instructions.trim()) {
    errors.instructions = "instructions is required";
  } else if (input.instructions.length < 3 || input.instructions.length > 1000) {
    errors.instructions = "instructions must be between 3 and 1000 characters";
  }

  if (input.diets.length === 0) {
    errors.diets = "Diets is required";
  }
  return errors;
};

function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
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
        title: "",
        summary: "",
        healthScore: 0,
        instructions: "",
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
                name="title"
                onBlur={(e) => handleBlur(e)}
                value={input.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.title && <p>{errors.title}</p>}

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
                <b>INSTRUCTIONS</b>
              </label>
              <br />
              <input
                className={style.input}
                type="text"
                name="instructions"
                value={input.instructions}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.instructions && <p>{errors.instructions}</p>}
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



export default Form;