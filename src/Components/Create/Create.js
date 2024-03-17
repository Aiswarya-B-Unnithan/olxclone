import React, { useContext, useEffect, useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, AuthContext } from "../../context/FirebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { v4 } from "uuid";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  const { Firebase } = useContext(FirebaseContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Now you can access the user state
    console.log("User in Create component:", user);
  }, [user]);

  const [name, setName] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === null) {
      // Handle the case where user is not defined or doesn't have a UID
      alert("something wrong");
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    // Upload the image to storage
    uploadBytes(imageRef, image).then((snapshot) => {
      // Get the download URL for the uploaded image
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        // Add the document to Firestore with the image URL
        addDoc(collection(db, "product"), {
          name,
          category,
          price,
          image: downloadURL,
          userId: user.uid,
          createdAt: date.toDateString(),
        });
        navigate("/");
      });
    });
  };

  return (
    <>
      <div className="centerDiv">
        <form className="form-container">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </form>

        {image && ( // Only render the <img> when there is an image
          <img
            alt="Posts"
            width="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
        )}
        <form className="form-container">
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
