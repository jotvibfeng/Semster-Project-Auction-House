import { BASE_URL, API_LISTING } from "../api/constant.js";
import { headers } from "../api/headers.js";
import { fetchAuctionHouseListing } from "./fetchAuctionHouseListing.js";

export async function deleteListing(listingId) {
  try {
    const response = await fetch(`${BASE_URL + API_LISTING}/${listingId}`, {
      method: "DELETE",
      headers: headers(true),
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    fetchAuctionHouseListing();
  } catch (error) {
    console.error("Error in deletePost:", error);
  }
}
