import { headers } from "./headers.js";
import { BASE_URL, API_BID_LISTING, API_SEARCH } from "./constant.js";

export async function getListing() {
  const response = await fetch(BASE_URL + API_BID_LISTING, {
    headers: headers(),
  });
  return await response.json();
}

export async function searchBid(query, bidPage = 1, maxBid = 10) {
  const options = {
    method: "GET",
    headers: headers(true),
  };
  const response = await fetch(
    `${BASE_URL + API_SEARCH}?q=${query}&_author=true&limit=${maxBid}&page=${bidPage}`,
    options
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed fetching posts.");
  }
  return json;
}
