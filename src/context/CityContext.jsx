import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsloading(true);
        const response = await axios.get("http://localhost:8000/cities");
        setCity(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    fetchCity();
  }, []);

  async function getCity(id) {
    try {
      setIsloading(true);
      const response = await axios.get(`http://localhost:8000/cities?id=${id}`);
      setCurrentCity(response.data[0]);
      // console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsloading(true);
      const response = await axios.post(
        `http://localhost:8000/cities`,
        newCity,
      );
      setCity((city) => [...city, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsloading(true);
      await axios.delete(`http://localhost:8000/cities/${id}`);
      setCity((city) => city.filter((c) => c.id !== id));
    } catch (error) {
      console.log("Axios error:", error);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{ city, isLoading, getCity, currentCity, createCity, deleteCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
