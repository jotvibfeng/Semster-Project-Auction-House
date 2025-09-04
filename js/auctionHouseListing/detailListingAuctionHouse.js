import { BASE_URL, API_LISTING } from '../api/constant.js';
import { headers } from '../api/headers.js';

async function fetchDetailListing(listingId) {
  const listingUrl = `${BASE_URL + API_LISTING}`; // <-- Remove /${listingId}

  try {
    const response = await fetch(listingUrl, {
      headers: headers(true),
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch listing detail');
    }

    const result = await response.json();
    // Find the listing in the array
    const listing = result.data.find((item) => item.id === listingId);
    console.log('Full API result:', result);
    console.log('listing:', listing);
    if (!listing) {
      throw new Error('Listing not found');
    }
    displayListingDetail(listing);
  } catch (error) {
    console.error('Error fetching listing detail:', error);
    displayError(error.message);
  }
}

function displayError(message) {
  const listingDetailContainer = document.getElementById(
    'listingDetailContainer'
  );
  if (!listingDetailContainer) return;
  listingDetailContainer.innerHTML = `
    <div class="border rounded-lg p-4 mb-4 bg-white shadow-md mx-auto text-center">
      <h3 class="text-xl font-bold mb-2 text-red-500">Error</h3>
      <p class="text-gray-700 mb-4">${message}</p>
    </div>
  `;
}

function displayListingDetail(listing) {
  const listingDetailContainer = document.getElementById(
    'listingDetailContainer'
  );
  if (!listingDetailContainer) return;

  // Prepare fields with fallbacks
  const title = listing.title || 'No title available';
  const description = listing.description || 'No description available';
  const seller = listing.seller?.name || 'Unknown seller';
  const bids = listing._count?.bids ?? 0;

  // Image logic
  let imageUrl = '';
  let imageAlt = 'Listing image';
  if (
    Array.isArray(listing.media) &&
    listing.media.length > 0 &&
    listing.media[0].url
  ) {
    imageUrl = listing.media[0].url;
    imageAlt = listing.media[0].alt || 'Listing image';
  }

  // Time left logic
  function getTimeLeft() {
    const now = new Date();
    const endsAt = new Date(listing.endsAt);
    const diff = endsAt - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return 'Ended';
  }

  listingDetailContainer.innerHTML = `
    <div class="border rounded-lg p-6 mb-4 bg-white shadow-md mx-auto max-w-xl text-center">
      <img src="${imageUrl}" alt="${imageAlt}" class="object-cover rounded-lg w-[400px] h-[200px] mx-auto mb-4" />
      <h2 class="text-2xl font-bold mb-2">${title}</h2>
      <p class="text-gray-700 mb-4">${description}</p>
      <p class="text-gray-600 mb-2">Seller: ${seller}</p>
      <p id="timeLeft" class="text-gray-500 text-xs mb-2">Time left: ${getTimeLeft()}</p>
      <p class="text-gray-700 text-sm mb-2">Bids: ${bids}</p>
      <form id="bidForm" class="flex flex-col sm:flex-row gap-2 w-full justify-center items-center mt-2">
        <input type="number" min="1" placeholder="Your bid" required
          class="border rounded px-2 py-1 text-sm w-32" />
        <button type="submit"
          class="bg-listing-button hover:bg-hover-login text-white font-semibold py-2 px-4 rounded transition">
          Place Bid
        </button>
      </form>
    </div>
  `;

  // Countdown update
  const timeLeftElem = document.getElementById('timeLeft');
  let intervalId = setInterval(() => {
    if (timeLeftElem) {
      const left = getTimeLeft();
      timeLeftElem.textContent = `Time left: ${left}`;
      if (left === 'Ended') clearInterval(intervalId);
    }
  }, 1000);

  // Bid form handler
  const bidForm = document.getElementById('bidForm');
  if (bidForm) {
    bidForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const bidInput = bidForm.querySelector("input[type='number']");
      const bidValue = bidInput.value;
      if (!bidValue || isNaN(bidValue) || Number(bidValue) <= 0) {
        alert('Please enter a valid amount.');
        return;
      }
      // Replace this alert with your API call to place a bid
      alert(`Bid of ${bidValue} placed on "${title}" (ID: ${listing.id})`);
      bidInput.value = '';
    });
  }
}

// Get the listing ID from the URL query parameters and fetch details
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

if (listingId) {
  fetchDetailListing(listingId);
} else {
  displayError('No listing ID found in URL');
}
