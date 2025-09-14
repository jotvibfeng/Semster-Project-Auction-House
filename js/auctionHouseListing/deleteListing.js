import { BASE_URL } from "../api/constant.js";
import { headers } from "../api/headers.js";
import { fetchAuctionHouseListing } from "./fetchAuctionHouseListing.js";

export async function deleteListing(listingId) {
  try {
    const response = await fetch(`${BASE_URL}/auction/listings/${listingId}`, {
      method: "DELETE",
      headers: headers(true),
    });
    if (!response.ok) {
      throw new Error("Failed to delete Listing");
    }
    fetchAuctionHouseListing();
  } catch (error) {
    console.error("Error in deleteListing:", error);
  }
}
