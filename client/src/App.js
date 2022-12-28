import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./Pages/Orders";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="App">
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
