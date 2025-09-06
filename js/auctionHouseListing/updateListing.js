import { BASE_URL, API_LISTING } from '../api/constant.js';
import { headers } from '../api/headers.js';

export async function updateListing(listingId, listing) {
  const messageElement = document.getElementById('message');

  try {
    const response = await fetch(`${BASE_URL + API_LISTING}/${listingId}`, {
      method: 'PUT',
      headers: headers(true),
      body: JSON.stringify(listing),
    });
    if (!response.ok) {
      throw new Error('Failed to update listing');
    }
    messageElement.textContent = 'Listing update succesfully';
    messageElement.style.color = 'green';
  } catch (error) {
    console.error('Error in updateListning:', error);
    messageElement.textContent = 'Failed to update listing';
    messageElement.style.color = 'red';
    throw error;
  }
}
