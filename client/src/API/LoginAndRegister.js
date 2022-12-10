import axios from "axios";

export async function login(identifier, password) {
  try {
    const response = await axios.post("/api/auth/local", {
      identifier,
      password,
    });
    return response;
  } catch (error) {
    return error.response.data.error.message;
  }
}
