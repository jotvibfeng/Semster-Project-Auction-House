import { BASE_URL, API_AUTH, API_REGISTER } from '../api/constant.js';
import { headers } from '../api/headers.js';

export async function register(name, email, password) {
  const response = await fetch(BASE_URL + API_AUTH + API_REGISTER, {
    headers: headers(true),
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  const messageElement = document.getElementById('message');

  if (response.ok) {
    const data = await response.json();
    messageElement.textContent = 'Registration successful';
    messageElement.style.color = 'green';
    window.location = '/profile.html';
    return data;
  }

  try {
    await response.json();
  } catch (error) {
    messageElement.textContent = 'Profile already exists';
    messageElement.style = 'red';
  }

  throw new Error('Could not register the user');
}
