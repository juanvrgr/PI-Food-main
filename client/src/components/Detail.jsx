import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { Link, useParams } from "react-router-dom";

export default function Detail(props) {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [cambio, setCambio] = useState(false);
    const detail = useSelector((state) => state.detail);
  
    useEffect(() => {
      dispatch(getDetail(id));
      setCambio(true);
    }, [dispatch]);
    console.log(detail);
  
    return (
      <div>
        <Link to="/home">
          <button>Go back</button>
        </Link>
        {detail.length ? (
          <div>
            <h1>Name: "{detail[0].title}"</h1>
            <img
              src={
                detail[0].image ? (
                  detail[0].image
                ) : (
                  <img
                    src="https://previews.123rf.com/images/mackoflower/mackoflower1507/mackoflower150700380/42588917-variedad-de-ensaladas-populares-y-saludables-en-la-dieta-alimentos-collage-de-im%C3%A1genes.jpg"
                    alt="img plate"
                  />
                )
              }
              alt="img recipe"
            />
            <div>
              {detail[0].createdDb ? (
                <h2>
                  Type of Diets: {detail[0].diets.map((d) => d.name).join(", ")}
                </h2>
              ) : (
                <h2>
                  Type of Diets:
                  {detail[0].vegetarian === true
                    ? " " + detail[0].diets.join(", ") + ", vegetarian"
                    : " " + detail[0].diets.join(", ")}
                </h2>
              )}
              <h3>
                {detail[0].createdDb
                  ? null
                  : "Dish types: " + detail[0].dishTypes.join(", ")}
              </h3>
            </div>
            <div >
              {detail[0].aggregateLikes !== 0 ? (
                <h3>Score: {detail[0].aggregateLikes}</h3>
              ) : (
                <h3>Score: - </h3>
              )}
              {detail[0].healthScore !== 0 ? (
                <h3>Health Score: {detail[0].healthScore}</h3>
              ) : (
                <h3>Health Score: - </h3>
              )}
              <h3>Summary:</h3>
              <p>{detail[0].summary.replace(/<[^>]*>?/g, "")}</p>
              {detail[0].analyzedInstructions ? (
                <h3>Step by step instructions: </h3>
              ) : (
                <h3>Step by step instructions: - </h3>
              )}
              {detail[0].analyzedInstructions.length > 0 ? (
                <ul>
                  {detail[0].createdDb ? (
                    <li>{detail[0].analyzedInstructions}</li>
                  ) : (
                    detail[0].analyzedInstructions[0].steps.map((p) => (
                      <li key={p.number}>{p.step}</li>
                    ))
                  )}
                </ul>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }