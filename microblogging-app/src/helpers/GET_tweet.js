import { Microbloggin_API_URL } from "../constants";

export const getFromApi = async () => {
  const request = await fetch(Microbloggin_API_URL);
  const response = await request.json();
  console.log("Response from server", response.tweets);
  return response.tweets;
};
