import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
