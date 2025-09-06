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
export async function fetchUploadImages(file) {
  const profile = load('profile');
  if (!profile || !profile.name) {
    console.error('User not found.');
    return;
  }

  const profileUrl = `${BASE_URL}${API_PROFILE}/${profile.name}`;
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await fetch(profileUrl, {
      method: 'PUT', // or 'POST' as your API requires
      headers: {
        ...headers(true),
        // Do NOT set Content-Type! The browser sets it for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    // Update image preview if needed
    const profilePic = document.getElementById('profilePic');
    if (data.data && data.data.avatar && profilePic) {
      profilePic.src = data.data.avatar;
    }
    // Show success message
    const msg = document.getElementById('uploadMsg');
    if (msg) {
      msg.textContent = 'Profile picture updated!';
      msg.className = 'text-green-500';
    }
  } catch (error) {
    const msg = document.getElementById('uploadMsg');
    if (msg) {
      msg.textContent = 'Error uploading image.';
      msg.className = 'text-red-500';
    }
    console.error(error);
  }
}

// Add this in your main file or after DOMContentLoaded
export function setupProfileImageUpload() {
  const fileInput = document.getElementById('profileImageInput');
  const uploadBtn = document.getElementById('uploadProfileImageBtn');

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', async () => {
      const file = fileInput.files[0];
      if (!file) {
        const msg = document.getElementById('uploadMsg');
        if (msg) {
          msg.textContent = 'Please select an image.';
          msg.className = 'text-red-500';
        }
        return;
      }
      await fetchUploadImages(file);
    });
  }
}
