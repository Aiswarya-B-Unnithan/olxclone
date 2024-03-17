import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { AuthContext } from "./context/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Layout() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("No user");
      }
    });
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
