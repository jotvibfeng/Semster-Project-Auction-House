document.getElementById("openCreateListing").onclick = function () {
  document.getElementById("createListingModal").classList.remove("hidden");
};
// Hide the modal when the close button is clicked
document.getElementById("closeCreateListing").onclick = function () {
  document.getElementById("createListingModal").classList.add("hidden");
  document.getElementById("createListingStatus").textContent = "";
  document.getElementById("createListingForm").reset();
};
// Hide modal when clicking outside the form
document.getElementById("createListingModal").onclick = function (e) {
  if (e.target === this) {
    this.classList.add("hidden");
    document.getElementById("createListingStatus").textContent = "";
    document.getElementById("createListingForm").reset();
  }
};
