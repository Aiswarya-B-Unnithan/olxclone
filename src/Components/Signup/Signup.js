import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../context/FirebaseContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { Firebase } = useContext(FirebaseContext);

  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          const user = result.user;
          user.displayName = name;

          //Adding user details into firestore db
          addDoc(collection(db, "users"), {
            id: user.uid, // Access user.uid here
            username: name,
            phone: phone,
          });
        })
        .then(() => {
          console.log("FireBaseData", Firebase);
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorMessage);
          alert(`${errorCode}: ${errorMessage},Try Again`);
        });
    } catch (error) {
      alert(`${error.message},Try Again`);
      console.log("Error during registration:", error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
