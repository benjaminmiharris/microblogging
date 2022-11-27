import { Microbloggin_API_URL } from "../constants";

const testerTweet = {
  content: "This is a tweet",
  userName: "string",
  date: "2020-05-18T14:10:30.000Z",
};

export async function postTweet(tweetObject) {
  const response = await fetch(Microbloggin_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweetObject),
  });

  console.log(response);
}
