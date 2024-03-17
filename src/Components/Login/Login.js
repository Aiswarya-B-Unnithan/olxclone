import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { FirebaseContext, AuthContext } from "../../context/FirebaseContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleLoggin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("successfull login", user);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo}></img>
      <form onSubmit={handleLoggin}>
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
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="pswd"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button>Login</button>
      </form>
      <Link to='/signup'>Signup</Link>
    </div>
  );
}

export default Login;
