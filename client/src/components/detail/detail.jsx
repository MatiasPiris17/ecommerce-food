import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import style from "./Detail.module.css";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={style.containerDetail}>
      <div className={style.recipeDetail}>
        <h1 className={style.recipeTitle}>{detail.name}</h1>
        <div className={style.recipeImgContainer}>
          <img
            className={style.recipeImg}
            src={detail.image}
            alt={detail.name}
          />
        </div>
        <div className={style.recipeData}>
          <h4 className={style.recipeHealthScore}>
            Health Score: {detail.healthScore}
          </h4>
          <h4 className={style.recipeDiets}>Diets: {detail.diets}</h4>
          {detail.summary && (
            <div className={style.recipeSummary}>
              <h3 className={style.recipeSummaryTitle}>Summary:</h3>
              <p
                className={style.recipeSummaryContent}
                dangerouslySetInnerHTML={{ __html: detail.summary }}
              ></p>
            </div>
          )}
        </div>
        <div className={style.recipeSteps}>
          <p className={style.recipeStepsTitle}>Steps:</p>
          <ol className={style.recipeStepsContent}>
            {detail.steps?.map((step) => (
              <li>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className={style.back}>
        <Link to="/home">
          <button className={style.btn}>HOME</button>
        </Link>
      </div>
    </div>
  );
}
