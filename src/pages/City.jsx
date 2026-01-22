import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCurrentCity} from "../features/city/cityThunks"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading , currentCity , error } = useSelector((state) => state.city)

  useEffect(() => {
    dispatch(fetchCurrentCity(id));
  }, [dispatch , id]);

  const { cityName, date } = currentCity;

  if (isLoading || !date)
    return <p className="text-xl text-gray-400 text-center">Loading...</p>;

  return (
    <div className="text-white flex flex-col gap-3 bg-gray-500 items-start px-10 py-5 uppercase">
      <div className="flex flex-col gap-1  items-start">
        <h3 className="text-white text-sm">CityName</h3>
        <p className="text-2xl tracking-widest text-gray-800">{cityName}</p>
      </div>
      <div className="flex flex-col gap-1  items-start">
        <h3 className="text-white text-sm">You went to {cityName} On</h3>
        <p className="text-2xl tracking-widest text-gray-800">{formatDate(date)}</p>
      </div>
      <div className="flex flex-col gap-1  items-start">
        <h3 className="text-white text-sm">Learn more</h3>
        <p className="text-xl tracking-widest text-blue-400 underline text-left ">
          <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank">
            Check out {cityName} on wikipedia
          </a>
        </p>
      </div>
      <button
        type="button"
        className="px-4 py-2 border border-white text-black rounded-lg hover:bg-gray-100"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default City;
