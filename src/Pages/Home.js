import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/FirebaseContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";

import Posts from "../Components/Posts/Posts";
import Footer from "../Components/Footer/Footer";

function Home(props) {
  const { setUser } = useContext(AuthContext);
  const { Firebase } = useContext(FirebaseContext);
  

  return (
    <div className="homeParentDiv">
      <Banner />
      <Posts />
    </div>
  );
}

export default Home;
