export function displayAuctionHouseListing(listings) {
  console.log('API listing:', listings);
  const listingContainer = document.getElementById('listingContainer');
  listingContainer.innerHTML = '';
  listingContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8';

  listings.forEach((listing) => {
    const endsAt = new Date(listing.endsAt);
    const now = new Date();
    const diff = endsAt - now;
    let timeLeft = 'Ended';
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      timeLeft = `${hours}h ${minutes}m left`;
    }

    const card = document.createElement('div');
    card.className = 'bg-white   overflow-hidden flex flex-col cursor-pointer ';

    card.addEventListener('click', () => {
      window.location.href = `/listingDetail.html?id=${listing.id}`;
    });

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
    info.className = ' mt-2 flex flex-col gap-2';

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
        const day = Math.floor(diff / (1000 * 24 * 60 * 60));
        const hours = Math.floor(diff / (10000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        time.textContent = `Time left: ${day}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        time.textContent = 'Time left: Ended';
        clearInterval(intervalId);
      }
    }

    // Initial call
    updateCountdown();
    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    const bids = document.createElement('p');
    bids.className = 'text-gray-700 text-sm';
    bids.textContent = `Bids: ${listing._count?.bids ?? 0}`;

    // Bid form
    const bidForm = document.createElement('form');
    bidForm.className = 'flex gap-2 mt-2 w-full';

    bidForm.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    const bidInput = document.createElement('input');
    bidInput.type = 'number';
    bidInput.min = '1';
    bidInput.placeholder = 'Your bid';
    bidInput.required = true;
    bidInput.className = 'flex-1 border rounded px-2 py-1 text-sm';

    const bidButton = document.createElement('button');
    bidButton.type = 'submit';
    bidButton.className =
      'bg-listing-button hover:bg-hover-login text-white font-semibold py-2 px-4 rounded w-32 transition';
    bidButton.textContent = 'Place Bid';

    bidForm.appendChild(bidInput);
    bidForm.appendChild(bidButton);

    bidForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const bidValue = bidInput.value;
      if (!bidValue || isNaN(bidValue) || Number(bidValue) <= 0) {
        alert('Please enter a valid amount.');
        return;
      }
      // Replace this alert with your API call to place a bid
      alert(
        `Bid of ${bidValue} placed on "${listing.title}" (ID: ${listing.id})`
      );
      bidInput.value = '';
    });

    bidForm.appendChild(bidInput);
    bidForm.appendChild(bidButton);

    info.appendChild(seller);
    info.appendChild(time);
    info.appendChild(bids);
    info.appendChild(bidForm);
    card.appendChild(imageWrapper);
    card.appendChild(info);

    listingContainer.appendChild(card);
  });
}
