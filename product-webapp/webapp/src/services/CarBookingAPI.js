import axios from "axios";

export const updateRating = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    if (response.status !== 202) return { status: "error" };
    return response.data;
  } catch (error) {
    return { status: "error" };
  }
};
