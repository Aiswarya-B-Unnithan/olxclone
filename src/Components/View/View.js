import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./View.css";
import { PostContext } from "../../context/PostContext";
import { FirebaseContext } from "../../context/FirebaseContext";
import { toast } from "react-toastify";
function View() {
  const [userDetails, setUserDetails] = useState(null); // Initialize userDetails as null
  const { postDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);
  const { userId } = postDetails;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userQuery = collection(db, "users");
        const userSnapshot = await getDocs(userQuery);

        let userData = null;

        userSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.id === userId) {
            userData = data;
          }
        });

        if (userData) {
          setUserDetails(userData); // Update userDetails with fetched data
        } else {
          console.log("No such user document for ID:", userId);
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    };

    if (postDetails && postDetails.userId) {
      fetchUserDetails();
    }
  }, [postDetails, userId]);

  const handleAddToCart = () => {
    toast.success("Item added to the cart");
  };

  return (
    <div className="viewParentDiv">
      <div
        className="imageShowDiv"
        style={{ marginTop: "100px", marginLeft: "600px" }}
      >
        <img
          src={postDetails.image}
          alt=""
          style={{ width: "400px", height: "400px" }}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails ? userDetails.username : "Loading..."}</p>
          <p>{userDetails ? userDetails.phone : "Loading..."}</p>
        </div>
      </div>
      <div className="center">
        <button className="addToCartBtn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default View;
