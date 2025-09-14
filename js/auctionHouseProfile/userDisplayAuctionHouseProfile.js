import { editUserProfile } from "./editProfileAuctionHouse.js";

export function userDisplayAuctionHouseProfile(profile) {
  const userProfileDiv = document.getElementById("auctionProfile-user");
  if (!userProfileDiv) {
    console.error("Element #auctionProfile-user not found");
    return;
  }
  userProfileDiv.innerHTML = createHTML(profile);

  const saveBtn = document.getElementById("save-profile-picture");
  if (saveBtn) {
    saveBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      await fetchSaveProfilePicture();
    });
  }

  const plusBtn = document.getElementById("add-picture-btn");
  if (plusBtn) {
    plusBtn.addEventListener("click", async () => {
      await fetchSaveProfilePicture();
    });
  }
}

function createHTML(profile) {
  const savedAvatar = localStorage.getItem("profile-avatar");
  const avatarUrl = savedAvatar || profile.avatar?.url || "";
  const avatarAlt = profile.avatar?.alt || profile.name || "Profile picture";

  const listings = Array.isArray(profile.listings) ? profile.listings : [];
  const wins = Array.isArray(profile.wins) ? profile.wins : [];
  const listingsCount = profile._count?.listings ?? 0;
  const winsCount = profile._count?.wins ?? 0;

  return `
    <div class="flex flex-col md:flex-row w-full items-start">
      <!-- Profile Card (left/above) -->
      <div class="m-6 flex flex-col items-center z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold font-roboto mb-4">${
          profile.name || "No name"
        }</h1>
        <div class="relative mb-4">
          <div id="profile-picture-container" class="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300 flex items-center justify-center bg-gray-100">
            ${
              avatarUrl
                ? `<img id="profile-picture-preview" src="${avatarUrl}" alt="${avatarAlt}" class="w-full h-full object-cover" />`
                : `<div id="profile-picture-placeholder" class="w-full h-full flex items-center justify-center text-6xl text-blue-400 bg-gray-100">?</div>`
            }
          </div>
          <button id="add-picture-btn" type="button"
            class="absolute top-0 right-0 rounded-full p-2 "
            title="Add profile picture" aria-label="Add profile picture">
            <i class="fa-solid fa-plus text-grey text-3xl"></i>
          </button>
        </div>
        <div>
          <h2 class="font-roboto mb-4"> Credit: ${
            profile.credits || "No credits"
          }</h2>
        </div>
        <button id="save-profile-picture" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition mt-2">Save</button>
      </div>

      <!-- History Section (right/below) -->
      <div class="w-full max-w-2xl mt-8 mb-8 md:mt-6 md:mb-6  bg-white rounded-lg shadow-lg p-6">
        <!-- Listings Made -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-2">My Listings</h2>
          <ul id="profile-listings" class="space-y-2">
            ${
              listings.length
                ? listings
                    .map(
                      (l) =>
                        `<li class="bg-gray-100 rounded p-3 flex justify-between items-center">
                        <span class="font-medium">${
                          l.title || "Untitled"
                        }</span>
                        <span class="text-sm text-gray-500">Ends: ${
                          l.endsAt
                            ? new Date(l.endsAt).toLocaleDateString()
                            : ""
                        }</span>
                      </li>`
                    )
                    .join("")
                : `<li class="text-gray-400">No listings made yet. (Total: ${listingsCount})</li>`
            }
          </ul>
        </div>
        <!-- Wins -->
        <div>
          <h2 class="text-xl font-semibold mb-2">My Wins</h2>
          <ul id="profile-wins" class="space-y-2">
            ${
              wins.length
                ? wins
                    .map(
                      (w) =>
                        `<li class="bg-green-100 rounded p-3 flex justify-between items-center">
                        <span class="font-medium">${
                          w.title || "Untitled"
                        }</span>
                        <span class="text-sm text-gray-500">Won: ${
                          w.endsAt
                            ? new Date(w.endsAt).toLocaleDateString()
                            : ""
                        }</span>
                      </li>`
                    )
                    .join("")
                : `<li class="text-gray-400">No wins yet. (Total: ${winsCount})</li>`
            }
          </ul>
        </div>
      </div>
    </div>
  `;
}

export async function fetchSaveProfilePicture() {
  const url = prompt(
    "Paste a public image URL for your profile picture (the API requires a public URL):"
  );
  if (!url) {
    alert("No URL provided.");
    return;
  }

  try {
    await editUserProfile({
      avatar: { url, alt: "Profile picture" },
    });
    alert("Profile picture updated!");
  } catch (error) {
    alert(error.message || "Failed to update profile picture.");
  }
}
