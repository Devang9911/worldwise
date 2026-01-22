import React from "react";
import CityItem from "./CityItem";
import { useDispatch, useSelector } from "react-redux";

function CityList() {
  const dispatch = useDispatch()
  const {city , isLoading} = useSelector((state)=>state.city)

  if (isLoading)
    return <p className="text-xl text-gray-400 text-center">Loading...</p>;

  if (!city.length)
    return (
      <p className="text-xl text-gray-400 text-center">
        Add your first city by clicking on a city on the map
      </p>
    );

  return (
    <ul className="text-white flex flex-col p-5 gap-5">
      {city.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
