import { onAuth } from '../ui/events/onAuth.js';
import { onAuthLogin } from '../ui/events/onAuthLogin.js';

function router() {
  const pathname = window.location.pathname;

  console.log(pathname);

  switch (pathname) {
    case '/':
    case '/index.html':
      onAuthLogin();
      break;
    case '/register/':
    case '/register.html':
      onAuth();
      break;
  }
}

router();
