import { BASE_URL, API_PROFILE } from '../api/constant.js';
import { load } from '../storage/load.js';
import { headers } from '../api/headers.js';
import { userDisplayAuctionHouseProfile } from './userDisplayAuctionHouseProfile.js';

export async function fetchUserProfileAuctionHouse() {
  const profile = load('profile');
  if (!profile || !profile.name) {
    console.error('Name not found');
    window.location.href = '/profile.html';
    return;
  }

  const profileUserName = profile.name;
  const profileUrl = `${BASE_URL}${API_PROFILE}/${profileUserName}`;
  console.log(BASE_URL, API_PROFILE, profileUserName);

  try {
    const response = await fetch(profileUrl, {
      method: 'GET',
      headers: headers(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const userProfileResponse = await response.json();
    userDisplayAuctionHouseProfile(userProfileResponse.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}
