import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CurrentWeather from "./CurrentWeather";
import { motion } from "framer-motion";

const axios = require("axios");

const Home = () => {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (input != null) {
      console.log(input);
      setCities(mockData);
      // axios
      //   .get(
      //     `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=sEvHurTb69R14XzxsOmHKkTLkMziVO3S&q=${input}`
      //   )
      //   .then(function (response) {
      //     // handle success
      //     console.log(response.data);
      //     setCities(response.data);
      //     //console.log(response);
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //   })
      //   .then(function () {
      //     // always executed
      //   });
    }
  }, [input]);

  return (
    <motion.div
      className="home"
      initial={{ y: "5vh", opacity: 0.4 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <div className="searchArea">
        <div className="searchInfo">
          <input type="text" required placeholder="Search" id="inputSearch" />
          <div
            className="searchIcon"
            onClick={(e) =>
              setInput(document.getElementById("inputSearch").value)
            }
          >
            <AiOutlineSearch size={28} />
          </div>
        </div>
        {/* <button
            className="changeUnits"
            onClick={() => setIsMetric(!isMetric)}
          >
            Change Units
          </button> */}
      </div>
      <div className="forecastDetails">
        {cities.length > 0 ? (
          cities.map((city) => {
            return (
              <CurrentWeather
                cityName={city.LocalizedName}
                countryName={city.Country.ID}
                cityKey={city.Key}
              />
            );
          })
        ) : (
          <div>
            Search a city!
            <br /> (please use the full name)
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;

const mockData = [
  {
    Version: 1,
    Key: "299429",
    Type: "City",
    Rank: 25,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "SA",
      LocalizedName: "Saudi Arabia",
    },
    AdministrativeArea: {
      ID: "02",
      LocalizedName: "Makkah al Mukarramah",
    },
  },
  {
    Version: 1,
    Key: "213225",
    Type: "City",
    Rank: 30,
    LocalizedName: "Jerusalem",
    Country: {
      ID: "IL",
      LocalizedName: "Israel",
    },
    AdministrativeArea: {
      ID: "JM",
      LocalizedName: "Jerusalem",
    },
  },
  {
    Version: 1,
    Key: "223078",
    Type: "City",
    Rank: 31,
    LocalizedName: "Jeonju",
    Country: {
      ID: "KR",
      LocalizedName: "South Korea",
    },
    AdministrativeArea: {
      ID: "45",
      LocalizedName: "Jeollabuk-do",
    },
  },
  {
    Version: 1,
    Key: "224209",
    Type: "City",
    Rank: 31,
    LocalizedName: "Jeju",
    Country: {
      ID: "KR",
      LocalizedName: "South Korea",
    },
    AdministrativeArea: {
      ID: "49",
      LocalizedName: "Jeju-do",
    },
  },
  // {
  //   Version: 1,
  //   Key: "203179",
  //   Type: "City",
  //   Rank: 35,
  //   LocalizedName: "Jember",
  //   Country: {
  //     ID: "ID",
  //     LocalizedName: "Indonesia",
  //   },
  //   AdministrativeArea: {
  //     ID: "JI",
  //     LocalizedName: "East Java",
  //   },
  // },
  // {
  //   Version: 1,
  //   Key: "306735",
  //   Type: "City",
  //   Rank: 42,
  //   LocalizedName: "Jerez de la Frontera",
  //   Country: {
  //     ID: "ES",
  //     LocalizedName: "Spain",
  //   },
  //   AdministrativeArea: {
  //     ID: "AN",
  //     LocalizedName: "Andalusia",
  //   },
  // },
  // {
  //   Version: 1,
  //   Key: "223116",
  //   Type: "City",
  //   Rank: 42,
  //   LocalizedName: "Jecheon",
  //   Country: {
  //     ID: "KR",
  //     LocalizedName: "South Korea",
  //   },
  //   AdministrativeArea: {
  //     ID: "43",
  //     LocalizedName: "Chungcheongbuk-do",
  //   },
  // },
  // {
  //   Version: 1,
  //   Key: "223080",
  //   Type: "City",
  //   Rank: 42,
  //   LocalizedName: "Jeongeup",
  //   Country: {
  //     ID: "KR",
  //     LocalizedName: "South Korea",
  //   },
  //   AdministrativeArea: {
  //     ID: "45",
  //     LocalizedName: "Jeollabuk-do",
  //   },
  // },
  // {
  //   Version: 1,
  //   Key: "171709",
  //   Type: "City",
  //   Rank: 43,
  //   LocalizedName: "Jena",
  //   Country: {
  //     ID: "DE",
  //     LocalizedName: "Germany",
  //   },
  //   AdministrativeArea: {
  //     ID: "TH",
  //     LocalizedName: "Thuringia",
  //   },
  // },
  // {
  //   Version: 1,
  //   Key: "3431691",
  //   Type: "City",
  //   Rank: 45,
  //   LocalizedName: "Jebres",
  //   Country: {
  //     ID: "ID",
  //     LocalizedName: "Indonesia",
  //   },
  //   AdministrativeArea: {
  //     ID: "JT",
  //     LocalizedName: "Central Java",
  //   },
  // },
];
