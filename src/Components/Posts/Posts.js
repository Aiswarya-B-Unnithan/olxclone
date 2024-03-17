import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../context/FirebaseContext";
import Heart from "../../assets/Heart";
import "./Post.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PostContext } from "../../context/PostContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const { Firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "product")).then((Snapshot) => {
      const allPosts = Snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPosts);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/viewPost");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
