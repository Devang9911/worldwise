import React from "react";
import CountryList from "../components/CountryList";
import { useCity } from "../context/CityContext";

function Countries() {
  const {city , isLoading} = useCity()
    const country = [...new Map(city.map((city)=> [city.countryName , city])).values()]
  if (isLoading)
    return <p className="text-xl text-gray-400 text-center">Loading...</p>;
  if (!city.length)
    return (
      <p className="text-xl text-center capitalize text-gray-400">
        Add your first country by clicking on map 🙎
      </p>
    );
  return (
    <div className="text-white flex flex-col p-5 gap-5">
      {country.map((city) => (
        <CountryList city={city} key={city.id} />
      ))}
    </div>
  );
}

export default Countries;
