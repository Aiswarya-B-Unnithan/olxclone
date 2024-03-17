import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseContext } from "./context/FirebaseContext";
import Context from "./context/FirebaseContext";
import Post from "./context/PostContext";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ViewPost from "./Pages/ViewPost";
import Posts from "./Components/Posts/Posts";
import Create from "./Pages/Create";
import { Firebase } from "../src/firebase/config";
import Category from "./Components/CategorywiseProducts/Category";
import Search, { SearchContext } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="Posts" element={<Posts />} />
        <Route path="viewPost" element={<ViewPost />} />
        <Route path="category/:ProductName" element={<Category />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);
console.log("firebase from index", Firebase);
ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ Firebase }}>
    <React.StrictMode>
      <Post>
        <Context>
          <Search>
            <ToastContainer />
            <RouterProvider router={router} />
          </Search>
        </Context>
      </Post>
    </React.StrictMode>
  </FirebaseContext.Provider>
);
