import { getListing } from '../../api/get.js';
import { login } from '../../auth/login.js';

export async function onAuthLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  await login(email, password);
  await getListing();
}
