import { BASE_URL } from "../api/constant.js";
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
      showNotification("Please enter a valid amount.", "error");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/${listingId}/bids?_seller=false&_bids=true`,
        {
          method: "POST",
          headers: headers(true),
          body: JSON.stringify({ amount: Number(bidValue) }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showNotification(
          errorData.errors?.[0]?.message || "Bid failed.",
          "error"
        );
        return;
      }

      showNotification("Bid placed!", "success");
      bidInput.value = "";
      setTimeout(fetchAuctionHouseListing, 2000);
    } catch (error) {
      showNotification("Error placing bid.", "error");
      console.error(error);
    }
  }
});

function showNotification(message, type = "success") {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    document.body.appendChild(notification);
  }
  notification.textContent = message;
  notification.className =
    "fixed top-4 right-4 z-50 px-4 py-2 rounded shadow transition " +
    (type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white");
  notification.classList.remove("hidden");
  setTimeout(() => {
    notification.classList.add("hidden");
  }, 2500);
}
