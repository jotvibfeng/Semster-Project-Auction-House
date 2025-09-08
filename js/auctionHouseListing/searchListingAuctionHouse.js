import { BASE_URL, API_SEARCH } from "../api/constant.js";
import { headers } from "../api/headers.js";
import { displayAuctionHouseListing } from "./displayListing.js";
import { fetchAuctionHouseListing } from "./fetchAuctionHouseListing.js"; // Make sure this import is present

export async function searchListing() {
  const searchTerm = document.getElementById("searchInput").value.trim();

  // If search is empty, show all listings and return early
  if (!searchTerm) {
    fetchAuctionHouseListing();
    return;
  }

  try {
    const headersConfig = headers(true);
    const response = await fetch(
      `${BASE_URL}${API_SEARCH}?q=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: headersConfig,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search listing");
    }

    const responseData = await response.json();
    const listing = responseData.data || [];

    if (!Array.isArray(listing)) {
      console.error("Search API response is not an array", listing);
      return;
    }

    displayAuctionHouseListing(listing);
  } catch (error) {
    console.error("Error in searchListing", error);
  }
}
