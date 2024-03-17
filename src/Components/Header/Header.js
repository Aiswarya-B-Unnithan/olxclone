import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/FirebaseContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Category from "../CategorywiseProducts/Category";
import { SearchContext } from "../../context/SearchContext";

function Header() {
  const [searchValue, setSearchValue] = useState("");

  const { searchedproducts, setSearchedProducts } = useContext(SearchContext);
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const productData = [];
  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = searchValue;
    // Convert the keyword to lowercase for case-insensitive searching
    const keywordLower = keyword.toLowerCase();
    const productsRef = collection(db, "product");
    // Create a query to search for products whose name contains the keyword
    const q = query(
      productsRef,
      where("name", ">=", keywordLower),
      where("name", "<=", keywordLower + "\uf8ff")
    );

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Handle each document that matches the search criteria
          productData.push(doc.data());
        });
        setSearchedProducts(productData);

        navigate(`/category/${keyword}`);
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("SignOut Sccuessfull");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        alert("Something Went wrong");
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to="/">
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
        </Link>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <Link to="/login">
            <span>{user ? user.email : "Login"}</span>
          </Link>
          <hr />
        </div>
        {user && <span onClick={handleSignOut}>LogOut</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <Link to="/create">
              {/* <SellButtonPlus></SellButtonPlus> */}
              <span>SELL</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
