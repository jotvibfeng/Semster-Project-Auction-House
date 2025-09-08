import { creatListing } from "./auctionHouseListing/createListingAuctionHouse.js";
import { fetchAuctionHouseListing } from "./auctionHouseListing/fetchAuctionHouseListing.js";
import { searchListing } from "./auctionHouseListing/searchListingAuctionHouse.js";

document.getElementById("createListingForm").onsubmit = async function (e) {
  e.preventDefault();
  const status = document.getElementById("createListingStatus");
  status.textContent = "Creating...";

  // Gather form data
  const title = document.getElementById("listingTitle").value;
  const description = document.getElementById("listingDescription").value;
  const endsAt = document.getElementById("endsAt").value;
  const mediaUrl = document.getElementById("listingImage").value;
  const media = mediaUrl ? [mediaUrl] : [];

  const listing = {
    title,
    description,
    endsAt,
    media,
  };

  try {
    await creatListing(listing);
    status.textContent = "Listing created!";
    setTimeout(() => {
      status.textContent = "";
      document.getElementById("createListingForm").reset();
      // location.reload(); // or fetchAuctionHouseListing();
    }, 1000);
  } catch (error) {
    status.textContent = error.message || "Error creating listing.";
    console.error("Error creating post:", error);
  }
};

document.getElementById("");

document.getElementById("searchInput").addEventListener("input", searchListing);

fetchAuctionHouseListing();
