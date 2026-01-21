import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const CityContext = createContext();

const initialState = {
  city: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CITY_LOADED":
      return {
        ...state,
        isLoading: false,
        city: action.payload,
      };
    case "CURRENTCITY_LOADED":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "CITY_CREATED":
      return {
        ...state,
        isLoading: false,
        city: [...state.city, action.payload],
        currentCity: action.payload,
      };
    case "CITY_DELETED":
      return {
        ...state,
        isLoading: false,
        city: state.city.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }; // why to false isloading here even after we did in all city actions? bcz if it gets error then loading never become false
    default:
      throw new Error("Unknown action type");
  }
}

export function CityProvider({ children }) {
  const [{ city, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCity() {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get("http://localhost:8000/cities");
        dispatch({ type: "CITY_LOADED", payload: response.data });
      } catch (error) {
        dispatch({ type: "REJECTED", payload: error.message });
      }
    }
    fetchCity();
  }, []);

  async function getCity(id) {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(`http://localhost:8000/cities?id=${id}`);
      dispatch({ type: "CURRENTCITY_LOADED", payload: response.data[0] });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.post(
        `http://localhost:8000/cities`,
        newCity,
      );
      dispatch({ type: "CITY_CREATED", payload: response.data });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`http://localhost:8000/cities/${id}`);
      dispatch({ type: "CITY_DELETED", payload: id });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  return (
    <CityContext.Provider
      value={{
        city,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
