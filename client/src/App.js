import { useEffect, useState } from "react";
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
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
      {!isUserSignedIn ? (
        <Login onLoginSuccessful={onLoginSuccessful} />
      ) : (
        <MainPage />
      )}
    </div>
  );
}

export default App;
