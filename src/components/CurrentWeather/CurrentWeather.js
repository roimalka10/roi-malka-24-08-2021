import React, { useState, useEffect } from "react";
import NextWeek from "../NextWeek/NextWeek";
const axios = require("axios");

const CurrentWeather = (props) => {
  const [cityWeather, setCityWeather] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${props.cityKey}?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S`
      )
      .then(function (response) {
        // handle success
        setCityWeather(response.data[0]);
        console.log(response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    getWeeklyForcast();
  }, []);

  const getWeeklyForcast = () => {
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.cityKey}?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S&metric=${isMetric}`
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
    getWeeklyForcast();
  }, [isMetric]);

  return (
    <>
      {cityWeather != null ? (
        <div>
          <div className="details">
            <div>{props.cityName}</div>
            <div>
              {isMetric
                ? cityWeather.Temperature.Metric.Value +
                  cityWeather.Temperature.Metric.Unit
                : cityWeather.Temperature.Imperial.Value +
                  cityWeather.Temperature.Imperial.Unit}
            </div>
            <div>{cityWeather?.WeatherText}</div>
          </div>
          <div className="newWeek">
            <div>
              {weeklyWeather != null ? (
                weeklyWeather.DailyForecasts.map((day) => {
                  return (
                    <NextWeek
                      date={day.Date}
                      forecast={day.Day.IconPhrase}
                      temp={
                        day.Temperature.Minimum.Value +
                        day.Temperature.Minimum.Unit
                      }
                    ></NextWeek>
                  );
                })
              ) : (
                <div>Loading weekly forcast</div>
              )}
            </div>
          </div>
          <button
            className="changeUnits"
            onClick={() => setIsMetric(!isMetric)}
          >
            Change Units
          </button>
        </div>
      ) : (
        <div>Loading Data</div>
      )}
    </>
  );
};

export default CurrentWeather;
