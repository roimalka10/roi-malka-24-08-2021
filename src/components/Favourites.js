import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Favourites = () => {
  const [showFavourite, setShowFavourite] = useState(false);

  const handleClick = () => {
    setShowFavourite(!showFavourite);
  };
  return (
    <>
      <div className="favouriteHome">
        <div>
          <div className="favouriteDetails">
            <div className="favIcon" onClick={handleClick}>
              {showFavourite ? (
                <AiFillStar size={44} color={"white"} />
              ) : (
                <AiOutlineStar size={44} />
              )}
            </div>
            <div>Tel aviv</div>
            <div>31C</div>
            <div>Sunny</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
