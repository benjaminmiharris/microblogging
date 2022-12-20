// import { Microbloggin_API_URL } from "../constants";

// export async function postTweet(tweetObject) {
//   const response = await fetch(Microbloggin_API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(tweetObject),
//   });
//   if (response.ok) {
//     let result = await response.json();
//     return result;
//   } else {
//     return `HTTP error: ${response.status}`;
//   }
// }
