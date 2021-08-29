import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/favourites";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const [showFavourite, setShowFavourite] = useState(false);

  const getDataWeather = () => {};

  const handleClick = (Key) => {
    console.log(Key);
    dispatch(remove(Key));
  };

  return (
    <div className="favouriteHome">
      {favourites.length > 0 ? (
        favourites.map((fav) => {
          return (
            <div className="favouriteDetails">
              <div
                className="favouriteIcon"
                onClick={() => handleClick(fav.Key)}
              >
                <AiFillStar size={44} />
              </div>
              <div className="favourite">
                <div>{fav.Name}</div>
                <div>31°C</div>
                <div>Sunny</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="noFavourite">No Favourites Yet</div>
      )}
    </div>
  );
};

export default Favourites;
