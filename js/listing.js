import { createListing } from "./auctionHouseListing/createListingAuctionHouse.js";
import { fetchAuctionHouseListing } from "./auctionHouseListing/fetchAuctionHouseListing.js";
import { searchListing } from "./auctionHouseListing/searchListingAuctionHouse.js";
import { deleteListing } from "./auctionHouseListing/deleteListing.js";

document.getElementById("createListingForm").onsubmit = async function (e) {
  e.preventDefault();
  const status = document.getElementById("createListingStatus");
  status.textContent = "Creating...";

  const title = document.getElementById("listingTitle").value;
  const description = document.getElementById("listingDescription").value;
  const endsAtInput = document.getElementById("endsAt").value;
  const endsAt = new Date(endsAtInput).toISOString();
  const mediaUrl = document.getElementById("listingImage").value.trim();

  if (mediaUrl && !/^https?:\/\/.+\..+/.test(mediaUrl)) {
    status.textContent =
      "Please enter a valid public image URL (starting with http or https).";
    return;
  }

  const media = mediaUrl ? [{ url: mediaUrl }] : [];

  const listing = {
    title,
    description,
    endsAt,
    media,
  };

  try {
    await createListing(listing);
    status.textContent = "Listing created!";
    setTimeout(() => {
      status.textContent = "";
      document.getElementById("createListingForm").reset();
      fetchAuctionHouseListing();
    }, 1000);
  } catch (error) {
    status.textContent = error.message || "Error creating listing.";
    console.error("Error creating post:", error);
  }
};

document.getElementById("searchInput").addEventListener("input", searchListing);

window.deleteListing = deleteListing;

fetchAuctionHouseListing();
