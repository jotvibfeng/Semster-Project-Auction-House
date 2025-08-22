export function displayAuctionHouseListing(listings) {
  const listingContainer = document.getElementById('listingContainer');
  listingContainer.innerHTML = '';
  // Responsive grid: 1 col mobile, 2 tablet, 4 desktop
  listingContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8';

  listings.forEach((listing) => {
    // Calculate time left
    const endsAt = new Date(listing.endsAt);
    const now = new Date();
    const diff = endsAt - now;
    let timeLeft = 'Ended';
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      timeLeft = `${hours}h ${minutes}m left`;
    }

    // Card container (no border)
    const card = document.createElement('div');
    card.className =
      'bg-white rounded-lg  overflow-hidden flex flex-col cursor-pointer ';

    card.addEventListener('click', () => {
      window.location.href = `/listingDetail.html?id=${listing.id}`;
    });

    // Image wrapper with title overlay
    const imageWrapper = document.createElement('div');
    imageWrapper.className =
      'relative w-full h-[150px] flex items-center justify-center';

    const img = document.createElement('img');
    img.className = 'mask-cover w-full h-[150px]';
    if (
      Array.isArray(listing.media) &&
      listing.media.length > 0 &&
      listing.media[0].url
    ) {
      img.src = listing.media[0].url;
      img.alt = listing.media[0].alt || 'Listing image';
    } else {
      img.src = 'https://via.placeholder.com/300x150?text=No+Image';
      img.alt = 'No image found';
    }

    // Title overlay
    const titleOverlay = document.createElement('div');
    titleOverlay.className =
      'absolute inset-0 flex items-center justify-center bg-black bg-opacity-40';
    const title = document.createElement('h2');
    title.className = 'text-white text-lg font-bold text-center px-2';
    title.textContent = listing.title;
    titleOverlay.appendChild(title);

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(titleOverlay);

    // Info section
    const info = document.createElement('div');
    info.className = 'p-4 flex flex-col gap-2';

    // Seller
    const seller = document.createElement('p');
    seller.className = 'text-gray-700 text-sm';
    seller.textContent = `Seller: ${listing.seller?.name || 'Unknown'}`;

    // Time left
    const time = document.createElement('p');
    time.className = 'text-gray-500 text-xs';

    // Function to update the countdown
    function updateCountdown() {
      const now = new Date();
      const diff = new Date(listing.endsAt) - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        time.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;
      } else {
        time.textContent = 'Time left: Ended';
        clearInterval(intervalId); // Stop updating when ended
      }
    }

    // Initial call
    updateCountdown();
    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Bid count
    const bids = document.createElement('p');
    bids.className = 'text-gray-700 text-sm';
    bids.textContent = `Bids: ${listing._count?.bids ?? 0}`;

    const bidButton = document.createElement('button');
    bidButton.className =
      'mt-2 bg-listing-button hover:bg-hover-login text-white font-semibold py-2 px-4 rounded transition';
    bidButton.textContent = 'Place Bid';
    bidButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card click
      // Add your bid logic here, e.g. open a modal or prompt
      alert(`Place a bid on "${listing.title}" (ID: ${listing.id})`);
    });

    info.appendChild(seller);
    info.appendChild(time);
    info.appendChild(bids);
    info.appendChild(bidButton);
    card.appendChild(imageWrapper);
    card.appendChild(info);

    listingContainer.appendChild(card);
  });
}
