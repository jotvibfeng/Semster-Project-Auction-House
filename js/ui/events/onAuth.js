import { getListing } from '../../api/get.js';
import { register } from '../../auth/register.js';

export async function onAuth(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  if (event.submitter.dataset.registerForm === 'register') {
    await register(name, email, password);
  } else {
    await register(name, email, password);
  }

  await getListing();
}
