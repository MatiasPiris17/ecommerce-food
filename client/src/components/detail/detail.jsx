import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <img src={detail.image} alt={detail.name} />
      </div>
      <h1>{detail.name}</h1>
      <div>
        <h2>HealthScore: {detail.healthScore}</h2>
        <h3>Diets: {detail.diets}</h3>
        {detail.summary && (
          <div>
            <h3>Summary: </h3>
            <p dangerouslySetInnerHTML={{ __html: detail.summary }}></p>
          </div>
        )}
      </div>
      <div>
        <p>
          Steps:{" "}
          {detail.steps?.map((e) => (
            <ol>{e}</ol>
          ))}
        </p>
        <div>
          <Link to="/home">
            <button>
              <b>HOME</b>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
