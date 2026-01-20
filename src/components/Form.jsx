import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../context/CityContext";

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0

function Form() {
  const navigate = useNavigate();
  const { createCity } = useCity();
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [error, setError] = useState("");

  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [countryName, setCountryName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setLoadingFormData(true);
        setError("");
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        if (!response.data.countryCode)
          throw new Error(
            "That doesnt seem to be a city, Click somewhere else 😍",
          );
        setCityName(response.data.city);
        setCountryName(response.data.countryName);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoadingFormData(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      emoji: "🏳️‍⚧️",
      date,
      notes,
      position: { lat, lng },
    };

    createCity(newCity);
    navigate("/app");
  };

  return (
    <div className="bg-gray-500 rounded-xl shadow-md py-5 flex justify-center uppercase">
      {loadingFormData ? (
        "Loading..."
      ) : error ? (
        error
      ) : (
        <form
          className="flex flex-col gap-4 px-10 w-full"
          onSubmit={handleSubmit}
        >
          {/* City Name */}
          <div className="flex flex-col items-start">
            <label className="block text-md mb-1 text-white">City Name</label>
            <input
              type="text"
              placeholder="Enter city name"
              className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={cityName}
              disabled
            />
          </div>

          {/* Date */}
          <div className="flex flex-col items-start">
            <label className="block text-md mb-1 text-white">
              When did you go?
            </label>
            {/* <input
              type="date"
              className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              // value={}
            /> */}
            <DatePicker
              className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col items-start">
            <label className="block text-md mb-1 text-white">
              Notes about your trip
            </label>
            <input
              type="text"
              placeholder="Short notes..."
              className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-white/60 text-black rounded-lg hover:bg-white/30"
            >
              Add
            </button>

            <button
              type="button"
              className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                navigate("/app");
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
