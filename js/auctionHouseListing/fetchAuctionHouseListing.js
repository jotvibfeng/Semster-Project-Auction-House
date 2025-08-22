import { BASE_URL, API_LISTING } from '../api/constant.js';
import { headers } from '../api/headers.js';
import { displayAuctionHouseListing } from './displayListing.js';

/**
 * Fetches auction house listings from the API, sorts them by date, and displays them.
 * @async
 * @function fetchAuctionHouseListing
 */
export async function fetchAuctionHouseListing() {
  try {
    const response = await fetch(`${BASE_URL + API_LISTING}`, {
      method: 'GET',
      headers: headers(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }

    const result = await response.json();
    const listing = result.data || result;

    if (!Array.isArray(listing)) {
      console.error('API response is not an array:', listing);
      return;
    }

    // Sort listings by creation date (newest first)
    listing.sort((a, b) => new Date(b.created) - new Date(a.created));

    displayAuctionHouseListing(listing);
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Optionally, display an error message in the UI here
  }
}
