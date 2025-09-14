# Semester Project: Auction House

This project is a modern web-based Auction House platform, built as part of my studies at Noroff. The application allows users to register, log in, create auction listings, place bids, and manage their profiles. It is built using HTML, CSS (Tailwind), and JavaScript, and integrates with the Noroff Auction API.

---

## Features

- **User Authentication:** Register, log in, and log out securely.
- **Profile Management:** Update profile information and avatar using a public image URL.
- **Auction Listings:** Create, view, search, and delete auction listings.
- **Bidding System:** Place bids on active listings and view bid history.
- **Responsive Design:** Fully responsive UI using Tailwind CSS.
- **Playwright Testing:** Automated end-to-end tests for login and core flows.

---

## Project Structure

```
/js
  /api           # API endpoints and helpers
  /auth          # Authentication logic
  /auctionHouseListing  # Listing, bidding, and display logic
  /auctionHouseProfile  # Profile display and editing
/tests           # Playwright test files
index.html       # Main login page
listing.html     # Listings overview
profile.html     # User profile
.env             # Environment variables for testing
```

---

## Process & Development

### 1. **Planning & Design**

- Defined user stories and core features.
- Designed wireframes for the main pages (login, listings, profile).

### 2. **Setup**

- Initialized the project with a clear folder structure.
- Set up Tailwind CSS for rapid UI development.
- Configured Playwright for automated browser testing.

### 3. **API Integration**

- Connected to the Noroff Auction API for authentication, listings, and bidding.
- Implemented secure storage of tokens and user data in localStorage.

### 4. **Feature Implementation**

- Built authentication and registration flows.
- Developed listing creation, display, and search.
- Added bidding functionality with real-time updates.
- Enabled profile editing, including avatar via public image URL.

### 5. **Testing & Debugging**

- Wrote Playwright tests for login and error handling.
- Debugged API integration and ensured error messages are user-friendly.
- Used browser dev tools and console logs for troubleshooting.

### 6. **Finalization**

- Polished UI and ensured accessibility.
- Updated documentation and cleaned up codebase.

---

## How to Run

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd Semster-Project-Auction-House
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` and fill in your credentials.

4. **Start a local server**

   ```sh
   npx serve .
   ```

   or use the Live Server extension in VS Code.

5. **Run Playwright tests**
   ```sh
   npx playwright test
   ```

---

## Technologies Used

- HTML5, CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Noroff Auction API
- Playwright (for E2E testing)

---

## Author

Joakim Tviberg Fengaas

---

## License

This project is for educational purposes as part of the Noroff curriculum.
