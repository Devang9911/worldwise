import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCity } from "../features/city/cityThunks";
import { useDispatch } from "react-redux";

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0

const initialState = {
  isLoading: false,
  error: "",
  cityName: "",
  countryName: "",
  date: new Date(),
  notes: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };
    case "LOAD_CITY_DATA":
      return {
        ...state,
        isLoading: false,
        cityName: action.payload.city,
        countryName: action.payload.country,
      };
    case "REJECTED":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
}

function Form() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const [lat, lng] = useUrlPosition();

  const [
    { isLoading, error, cityName, countryName, date, notes },
    localDispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCityData() {
      try {
        localDispatch({ type: "LOADING" });
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        if (!response.data.countryCode)
          throw new Error(
            "That doesnt seem to be a city, Click somewhere else 😍",
          );
        localDispatch({
          type: "LOAD_CITY_DATA",
          payload: {
            city: response.data.city,
            country: response.data.countryName,
          },
        });
      } catch (error) {
        localDispatch({ type: "REJECTED", payload: error.message });
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

    reduxDispatch(createCity(newCity));
    localDispatch({ type: "RESET_FORM" });
    navigate("/app");
  };

  return (
    <div className="bg-gray-500 rounded-xl shadow-md py-5 flex justify-center uppercase">
      {isLoading ? (
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
            <DatePicker
              className="w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(date) =>
                localDispatch({ type: "SET_DATE", payload: date })
              }
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
              onChange={(e) =>
                localDispatch({ type: "SET_NOTES", payload: e.target.value })
              }
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
