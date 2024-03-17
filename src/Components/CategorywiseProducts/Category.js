import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import "./categorywiseProduct.scss";

function Category() {
  const { searchedproducts, setSearchedProducts } = useContext(SearchContext);
  console.log("searchedproducts", searchedproducts);

  return (
    <div className="recommendations">
      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="cards">
        {searchedproducts.length === 0 ? (
          // Render a message when searchedProducts is empty
          <div className="no-products-message-container">
            <p>No products found.</p>
          </div>
        ) : (
          searchedproducts.map((product) => (
            <div className="card">
              <div className="favorite"></div>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Category;
