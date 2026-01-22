import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity } from "../features/city/cityThunks";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const dispatch = useDispatch();
  const currentCity = useSelector((state) => state.city.currentCity);
  const { id, emoji, cityName, date, position } = city;

  function handleDelete(e) {
    e.preventDefault();
    // console.log("param id:", id);
    // console.log("city id:", city.id);
    dispatch(deleteCity(id));
  }
  return (
    <li className="list-none">
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`bg-gray-500 p-1 rounded flex justify-between items-center gap-3 ${currentCity.id === id ? "border-4 border-green-500" : ""}`}
      >
        <div className="flex gap-3">
          <span className="text-xl">{emoji}</span>
          <h3 className="text-xl uppercase text-gray-300">{cityName}</h3>
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="text-xl uppercase text-gray-300">
            {formatDate(date)}
          </span>
          <button
            className="text-xl bg-gray-700 rounded-4xl p-1 hover:bg-gray-600 cursor-pointer z-9"
            onClick={handleDelete}
          >
            &times;
          </button>
        </div>
      </Link>
    </li>
  );
}

export default CityItem;
