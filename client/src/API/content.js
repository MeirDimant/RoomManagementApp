import axios from "axios";
import qs from "qs";

export async function getContent(type, query) {
  query = {
    ...query,
    sort: ["id:asc"],
  };
  const stringifyQuery = qs.stringify(query);
  try {
    const response = await axios.get(
      `http://localhost:1337/api/${type}?${stringifyQuery}`,
      {
        query,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getEntity(type, id, query) {
  query = {
    ...query,
    sort: ["id:asc"],
  };
  const stringifyQuery = qs.stringify(query);
  try {
    const response = await axios.get(`/api/${type}/${id}?${stringifyQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
