import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/protectedPages/MainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./Pages/protectedPages/Orders";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home-page" />} />
          <Route path="/home-page" element={<MainPage />} />
          <Route path="/calendar" element={<Orders />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
