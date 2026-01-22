import axios from "axios"
import {
  loading,
  cityLoaded,
  currentCityLoaded,
  cityCreated,
  cityDeleted,
  rejected,
} from "./citySlice"

const CITY_API = "http://localhost:8000/cities"

export function fetchAllCity(){
    return async function (dispatch) {
        dispatch(loading())
        try {
            const response = await axios.get(`${CITY_API}`)
            dispatch(cityLoaded(response.data))
        } catch (error) {
            dispatch(rejected(error.message))
        }
    }
}

export function fetchCurrentCity(id){
    return async function (dispatch) {
        dispatch(loading())
        try {
            const response = await axios.get(`${CITY_API}?id=${id}`)
            dispatch(currentCityLoaded(response.data[0]))
        } catch (error) {
            dispatch(rejected(error.message))
        }
    }
}

export function createCity(newCity){
    return async function (dispatch){
        dispatch(loading())
        try {
            const response = await axios.post(CITY_API , newCity)
            dispatch(cityCreated(response.data))
        } catch (error) {
            dispatch(rejected(error.message))
        }
    }
}

export function deleteCity(id){
    return async function (dispatch){
        dispatch(loading())
        try {
            await axios.delete(`${CITY_API}/${id}`)
            dispatch(cityDeleted(id))
        } catch (error) {
            dispatch(rejected(error.message))
        }
    }
}