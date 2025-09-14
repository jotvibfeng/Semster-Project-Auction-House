import { BASE_URL } from "../api/constant.js";
import { headers } from "../api/headers.js";

export async function createListing(listing) {
  try {
    const response = await fetch(`${BASE_URL}/auction/listings`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify(listing),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to create listing"
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createListingAuctionHouse:", error);
    throw error;
  }
}
