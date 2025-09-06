import { onAuthLogin } from './events/onAuthLogin.js';

console.log('[authLogin.js] Loaded');

export function setAuthLoginListener() {
  console.log('[authLogin.js] setAuthLoginListener called');
  const loginForm = document.forms.loginForm;
  if (loginForm) {
    console.log('[authLogin.js] loginForm found, attaching submit listener');
    loginForm.addEventListener('submit', (event) => {
      onAuthLogin(event);
    });
  } else {
    console.warn('[authLogin.js] loginForm not found');
  }
}

setAuthLoginListener();
