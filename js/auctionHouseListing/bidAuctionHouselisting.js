import { BASE_URL, API_BID_LISTING } from "../api/constant.js";
import { headers } from "../api/headers.js";
import { fetchAuctionHouseListing } from "./fetchAuctionHouseListing.js";

document.addEventListener("submit", async (event) => {
  if (event.target.matches("form.bid-form")) {
    event.preventDefault();
    const form = event.target;
    const listingId = form.getAttribute("data-listing-id");
    const bidInput = form.querySelector('input[name="amount"]');
    const bidValue = bidInput.value;

    if (!bidValue || isNaN(bidValue) || Number(bidValue) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}${API_BID_LISTING}/${listingId}/bids`,
        {
          method: "POST",
          headers: headers(true),
          body: JSON.stringify({ amount: Number(bidValue) }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.errors?.[0]?.message || "Bid failed.");
        return;
      }

      alert("Bid placed!");
      bidInput.value = "";
      // Refresh listings after a successful bid
      fetchAuctionHouseListing();
    } catch (error) {
      alert("Error placing bid.");
      console.error(error);
    }
  }
});
