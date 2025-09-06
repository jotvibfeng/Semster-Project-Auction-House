import { onAuth } from './events/onAuth.js';

export function setAuthListener() {
  document.forms.registerForm.addEventListener('submit', (event) => {
    onAuth(event);
  });
}

setAuthListener();
