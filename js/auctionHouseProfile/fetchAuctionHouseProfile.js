import { BASE_URL, API_PROFILE } from "../api/constant.js";
import { load } from "../storage/load.js";
import { headers } from "../api/headers.js";
import { userDisplayAuctionHouseProfile } from "./userDisplayAuctionHouseProfile.js";

export async function fetchUserProfileAuctionHouse() {
  const profile = load("profile");
  if (!profile || !profile.name) {
    console.error("Name not found");
    window.location.href = "/profile.html";
    return;
  }

  const profileUserName = profile.name;
  const profileUrl = `${BASE_URL}${API_PROFILE}/${profileUserName}`;
  const listingsUrl = `${BASE_URL}${API_PROFILE}/${profileUserName}/listings`;
  const winsUrl = `${BASE_URL}${API_PROFILE}/${profileUserName}/wins`;

  try {
    const response = await fetch(profileUrl, {
      method: "GET",
      headers: headers(true),
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    const userProfileResponse = await response.json();
    const profileData = userProfileResponse.data;

    // Fetch listings
    const listingsRes = await fetch(listingsUrl, {
      method: "GET",
      headers: headers(true),
    });
    const listingsData = await listingsRes.json();
    profileData.listings = listingsData.data || [];

    // Fetch wins
    const winsRes = await fetch(winsUrl, {
      method: "GET",
      headers: headers(true),
    });
    const winsData = await winsRes.json();
    profileData.wins = winsData.data || [];

    // Now display with full data
    userDisplayAuctionHouseProfile(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}
