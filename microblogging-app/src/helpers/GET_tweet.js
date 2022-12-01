import { Microbloggin_API_URL } from "../constants";

export const getFromApi = async () => {
  try {
    const request = await fetch(Microbloggin_API_URL);
    if (request.status === 200) {
      const response = await request.json();
      return response.tweets;
    }
    if (request.status >= 400) {
      throw new Error("Error");
    }
  } catch (e) {
    console.log("Error with the loading the tweets: ", e);
  }
};
