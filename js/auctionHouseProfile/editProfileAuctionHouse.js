import { BASE_URL } from "../api/constant.js";
import { headers } from "../api/headers.js";
import { userDisplayAuctionHouseProfile } from "./userDisplayAuctionHouseProfile.js";

/**
 * Edit the current user's profile.
 * @param {object} profileData - The updated profile data (e.g. { bio, avatar: { url, alt }, banner: { url, alt } })
 */
export async function editUserProfile(profileData) {
  try {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const username = profile?.name;
    if (!username) throw new Error("No username found in localStorage");

    const response = await fetch(`${BASE_URL}/auction/profiles/${username}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to update profile"
      );
    }
    const updatedProfile = await response.json();

    userDisplayAuctionHouseProfile(updatedProfile.data);
    return updatedProfile.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
