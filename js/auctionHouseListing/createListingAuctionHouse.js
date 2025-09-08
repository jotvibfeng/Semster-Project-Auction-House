import { BASE_URL, API_LISTING } from "../api/constant.js";
import { headers } from "../api/headers.js";

export async function creatListing(listing) {
  try {
    const response = await fetch(`${BASE_URL}${API_LISTING}`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify(listing),
    });
    const errorData = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("API error response:", errorData);
      throw new Error(errorData.message || "Failed to create listing");
    }
  } catch (error) {
    console.error("Error in createListingAuctionHouse:", error);
    throw error;
  }
}
