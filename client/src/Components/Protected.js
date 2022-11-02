import Login from "../Pages/LoginPage";

export default function Protected({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Login />;
  }

  return children;
}
