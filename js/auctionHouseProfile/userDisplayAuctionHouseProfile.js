export function userDisplayAuctionHouseProfile(profile) {
  const userProfileDiv = document.getElementById('auctionProfile-user');
  if (!userProfileDiv) {
    console.error('Element #auctionProfile-user not found');
    return;
  }
  userProfileDiv.innerHTML = createHTML(profile);

  // Add event listeners
  const fileInput = document.getElementById('profile-picture-input');
  if (fileInput) {
    fileInput.addEventListener('change', (event) =>
      handleProfilePictureChange(event, profile)
    );
  }

  const saveBtn = document.getElementById('save-profile-picture');
  if (saveBtn) {
    saveBtn.addEventListener('click', (event) => {
      event.preventDefault();
      saveProfilePicture(profile);
    });
  }

  // Clicking the plus icon triggers file input
  const plusBtn = document.getElementById('add-picture-btn');
  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      fileInput.click();
    });
  }
}

function createHTML(profile) {
  const savedAvatar = localStorage.getItem('profile-avatar');
  const avatarUrl = savedAvatar || profile.avatar?.url || '';
  const avatarAlt = profile.avatar?.alt || profile.name || 'Profile picture';

  return `
    <div class="fixed top-14 left-0 m-6 flex flex-col items-center z-50 bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold font-roboto mb-4">${
        profile.name || 'No name'
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
        <input id="profile-picture-input" type="file" accept="image/*" class="hidden" />
      </div>
      <button id="save-profile-picture" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition mt-2">Save</button>
    </div>
  `;
}
