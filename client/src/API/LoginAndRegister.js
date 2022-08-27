import axios from "axios";

export async function login(identifier, password) {
  return await axios
    .post("/api/auth/local", {
      identifier,
      password,
    })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.status === 200) {
        throw new Error("HTTP status " + response.status);
      }

      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
