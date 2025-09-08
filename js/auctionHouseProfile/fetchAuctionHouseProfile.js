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
    // Fetch profile info
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

export async function fetchSaveProfilePicture() {
  const fileInput = document.getElementById("profile-picture-input");
  const file = fileInput?.files[0];

  const statusDiv = document.getElementById("upload-status");
  if (!file) {
    if (statusDiv) statusDiv.textContent = "No file selected!";
    return;
  }

  const profile = load("profile");
  if (!profile || !profile.name) {
    if (statusDiv) statusDiv.textContent = "Profile not found!";
    return;
  }

  let imageUrl;
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Correct endpoint for image upload
    const uploadResponse = await fetch(`${BASE_URL}${API_PROFILE}`, {
      method: "POST",
      headers: headers(true),
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const uploadData = await uploadResponse.json();
    imageUrl = uploadData.url;
  } catch (error) {
    if (statusDiv) statusDiv.textContent = "Image upload failed.";
    console.error("Image upload failed:", error);
    return;
  }

  // Update profile with the new avatar URL
  const endpoint = `${BASE_URL}${API_PROFILE}/${profile.name}`;
  const body = {
    avatar: {
      url: imageUrl,
      alt: profile.name || "Profile picture",
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        ...headers(true),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Profile image upload response:", data);

    if (response.ok) {
      if (statusDiv) statusDiv.textContent = "Profile picture updated!";
      // Fetch and display the latest profile info after update
      await fetchUserProfileAuctionHouse();
    } else {
      if (statusDiv) statusDiv.textContent = data.message || "Upload failed.";
    }
  } catch (error) {
    if (statusDiv) statusDiv.textContent = "Error uploading image.";
    console.error("Error uploading image:", error);
  }
}
