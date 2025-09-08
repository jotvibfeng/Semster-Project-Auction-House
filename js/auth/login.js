import { headers } from "../api/headers.js";
import { BASE_URL, API_AUTH, API_LOGIN } from "../api/constant.js";
import { save } from "../storage/save.js";

export async function login(email, password) {
  const response = await fetch(BASE_URL + API_AUTH + API_LOGIN, {
    headers: headers(true),
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const messageElement = document.getElementById("message");

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);

    window.location.href = "/profile.html";
    return profile;
  } else {
    try {
      const errorData = await response.json();
      messageElement.textContent =
        errorData.message || "Could not login either wrong email or password";
    } catch {
      messageElement.textContent =
        "Could not login either wrong email or password";
    }
    messageElement.style.color = "red";
    throw new Error("Could not login either wrong email or password");
  }
}
