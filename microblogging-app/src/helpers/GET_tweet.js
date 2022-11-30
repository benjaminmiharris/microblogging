import { Microbloggin_API_URL } from "../constants";

export const getFromApi = async () => {
  try {
    const request = await fetch(Microbloggin_API_URL);
    const response = await request.json();
    console.log("Response from server", response.tweets);
    return response.tweets;
  } catch (e) {
    console.log("Error with the loading the tweets: ", e);
  }
  // getFromApi();
};
