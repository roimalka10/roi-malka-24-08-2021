import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import NextWeek from "./NextWeek";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { create, remove } from "../store/favourites";
import { motion } from "framer-motion";

const CurrentWeather = (props) => {
  const isMetric = useSelector((state) => state.isMetric);
  const [cityWeather, setCityWeather] = useState(null);
  const [showFavourite, setShowFavourite] = useState(false);
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  const HandleClick = () => {
    const isFavour = favourites.find((fav) => fav.Key == props.cityKey);
    if (isFavour) {
      dispatch(remove(props.cityKey));
    } else {
      dispatch(
        create({
          Key: props.cityKey,
          Name: props.cityName, // we pass this data to save with http requests
        })
      );
    }
  };

  useEffect(() => {
    const index = favourites.findIndex((fav) => fav.Key === props.cityKey);
    if (index !== -1) {
      setShowFavourite(true);
    } else {
      setShowFavourite(false);
    }
  }, [favourites, props.cityKey]);

  useEffect(() => {
    axios
      .get(
        `https://dataservice.accuweather.com/currentconditions/v1/${props.cityKey}?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S`
      )
      .then(function (response) {
        setCityWeather(response.data[0]);
        setIsError(false);
      })
      .catch(function (error) {
        setIsError(true);
      });
  }, [props.cityKey]);

  return (
    <>
      {isError ? (
        <div className="error">An error has occured, please refresh</div>
      ) : (
        <div>
          {cityWeather != null ? (
            <motion.div
              className="weatherMain"
              initial={{ y: "10vh", opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "tween" }}
            >
              <div className="details">
                {" "}
                <div className="favIcon">
                  {showFavourite ? (
                    <AiFillStar size={48} onClick={HandleClick} />
                  ) : (
                    <AiOutlineStar onClick={HandleClick} size={44} />
                  )}
                </div>
                <div className="cityDetails">
                  <div>
                    {props.cityName}, {props.countryName}
                  </div>
                  <div>
                    {isMetric.value
                      ? cityWeather.Temperature.Metric.Value +
                        "°" +
                        cityWeather.Temperature.Metric.Unit
                      : cityWeather.Temperature.Imperial.Value +
                        "°" +
                        cityWeather.Temperature.Imperial.Unit}
                  </div>
                  <div>{cityWeather.WeatherText}</div>
                </div>
              </div>

              <NextWeek cityKey={props.cityKey}></NextWeek>
            </motion.div>
          ) : (
            <div>Loading Data</div>
          )}
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
