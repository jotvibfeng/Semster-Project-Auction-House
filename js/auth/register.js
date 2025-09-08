import { BASE_URL, API_AUTH, API_REGISTER } from "../api/constant.js";
import { headers } from "../api/headers.js";

export async function register(name, email, password) {
  const response = await fetch(BASE_URL + API_AUTH + API_REGISTER, {
    headers: headers(true),
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  const messageElement = document.getElementById("message");

  if (response.ok) {
    const data = await response.json();
    messageElement.textContent = "Registration successful";
    messageElement.style.color = "green";
    window.location = "/profile.html";
    return data;
  }

  let errorMsg = "Could not register the user";
  try {
    const errorData = await response.json();
    if (errorData && errorData.errors && errorData.errors[0]?.message) {
      errorMsg = errorData.errors[0].message;
    }
  } catch {
    // ignore
  }
  messageElement.textContent = errorMsg;
  messageElement.style.color = "red";
  throw new Error(errorMsg);
}
