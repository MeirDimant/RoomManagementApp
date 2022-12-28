import axios from "axios";

export async function login(identifier, password) {
  try {
    const response = await axios.post("/api/auth/local", {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return { message: "Somthing went wrong!!" };
  }
}

export async function getMe() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return { message: "Somthing went wrong!!" };
  }
}
