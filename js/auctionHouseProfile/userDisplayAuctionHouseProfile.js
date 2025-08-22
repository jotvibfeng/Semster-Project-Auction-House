export function userDisplayAuctionHouseProfile(profile) {
  const userProfileDiv = document.getElementById('auctionProfile-user');
  if (!userProfileDiv) {
    console.error('Element #auctionProfile-user not found');
    return;
  }
  userProfileDiv.innerHTML = createHTML(profile);
}

function createHTML(profile) {
  return `
    <div class="fixed bottom-0 left-0 m-6 flex flex-col items-start z-50">
      <h1 class="text-xl font-bold font-roboto">${profile.name}</h1>
      <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-background-gray mb-4">
        <img src="${profile.avatar}" alt="${profile.name}" class="w-full h-full object-cover" />
      </div>
    </div>
  `;
}
