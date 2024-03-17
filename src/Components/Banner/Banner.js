import React from "react";

import "./Banner.css";
import Arrow from "../../assets/Arrow";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions">
            <Link to="/category">
              <span>CARS</span>
            </Link>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
