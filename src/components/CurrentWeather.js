import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import NextWeek from "./NextWeek";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { create, remove } from "../store/favourites";
import { motion } from "framer-motion";

const CurrentWeather = (props) => {
  const [cityWeather, setCityWeather] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [showFavourite, setShowFavourite] = useState(false);
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const HandleClick = () => {
    const isFavour = favourites.find((fav) => fav.Key == props.cityKey);
    if (isFavour) {
      dispatch(remove(props.cityKey));
    } else {
      dispatch(
        create({
          Key: props.cityKey,
          Name: props.cityName,
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
  }, [favourites]);

  useEffect(() => {
    // axios
    //   .get(
    //     `https://dataservice.accuweather.com/currentconditions/v1/${props.cityKey}?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S`
    //   )
    //   .then(function (response) {
    //     // handle success
    //     setCityWeather(response.data[0]);
    //     console.log(response.data[0]);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    // getWeeklyForcast();
    setCityWeather(fake[0]);
  }, []);

  const getWeeklyForcast = () => {
    axios
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.cityKey}?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S&metric=${isMetric}`
      )
      .then(function (response) {
        // handle success
        setWeeklyWeather(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    // getWeeklyForcast();
  }, [isMetric]);

  return (
    <>
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
                <AiFillStar size={44} onClick={HandleClick} />
              ) : (
                <AiOutlineStar onClick={HandleClick} size={44} />
              )}
            </div>
            <div className="cityDetails">
              <div>
                {props.cityName}, {props.countryName}
              </div>
              <div>
                {isMetric
                  ? cityWeather.Temperature.Metric.Value +
                    "°" +
                    cityWeather.Temperature.Metric.Unit.toLowerCase()
                  : cityWeather.Temperature.Imperial.Value +
                    "°" +
                    cityWeather.Temperature.Imperial.Unit.toLowerCase()}
              </div>
              <div>{cityWeather?.WeatherText}</div>
            </div>
          </div>
          <div className="newWeek">
            <>
              {weeklyWeather != null ? (
                weeklyWeather.DailyForecasts.map((day) => {
                  return (
                    <NextWeek
                      date={day.Date}
                      temp={
                        day.Temperature.Minimum.Value +
                        "°" +
                        day.Temperature.Minimum.Unit
                      }
                      forecast={day.Day.IconPhrase}
                    ></NextWeek>
                  );
                })
              ) : (
                <div className="loading">Loading weekly forcast</div>
              )}
            </>
          </div>
          {/* <button
            className="changeUnits"
            onClick={() => setIsMetric(!isMetric)}
          >
            Change Units
          </button> */}
        </motion.div>
      ) : (
        <div>Loading Data</div>
      )}
    </>
  );
};

export default CurrentWeather;

const fake = [
  {
    LocalObservationDateTime: "2021-08-23T23:01:00+03:00",
    EpochTime: 1629748860,
    WeatherText: "Mostly Sunny",
    WeatherIcon: 33,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 31.5,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 87.0,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us",
    Link: "http://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us",
  },
];
