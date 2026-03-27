const form      = document.getElementById('loginForm');
const emailEl   = document.getElementById('email');
const passwordEl= document.getElementById('password');
const emailErr  = document.getElementById('emailErr');
const pwdErr    = document.getElementById('pwdErr');
const togglePwd = document.getElementById('togglePwd');


togglePwd.addEventListener('click', () => {
  const isText = passwordEl.type === 'text';
  passwordEl.type = isText ? 'password' : 'text';
  togglePwd.textContent = isText ? 'Show' : 'Hide';
});


emailEl.addEventListener('input', () => hideError(emailErr));
passwordEl.addEventListener('input', () => hideError(pwdErr));

const showError = (el, msg) => {
  el.textContent = msg;
  el.classList.remove('hidden');
};
const hideError = (el) => el.classList.add('hidden');


const validate = () => {
  let valid = true;

  hideError(emailErr); hideError(pwdErr);

  if (!emailEl.value.trim()) 
  {
    showError(emailErr, 'Email is required.');
    valid = false;
  } 
  else if (!/^.+@.+\.com$/.test(emailEl.value.trim())) 
  {
    showError(emailErr, 'Enter a valid email address.');
    valid = false;
  }

  if (!passwordEl.value) 
  {
    showError(pwdErr, 'Password is required.');
    valid = false;
  } 
  else if (passwordEl.value.length < 6) 
  {
    showError(pwdErr, 'Password must be at least 6 characters.');
    valid = false;
  }

  return valid;
};


form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validate()) return;

  const email = emailEl.value.trim().toLowerCase();
  const password = passwordEl.value;

  localStorage.setItem('sw_logged_in', 'true');
  window.location.href = 'home.html';
});
