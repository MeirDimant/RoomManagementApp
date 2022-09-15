import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import Orders from "./Pages/Orders";
import "./App.css";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserSignedIn(true);
    else setIsUserSignedIn(false);
  }, []);

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  const onLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsUserSignedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
