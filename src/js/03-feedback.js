import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmitBtn);

function onInput(event) {
  const { email, message } = event.target.closest('.feedback-form').elements;
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

function updateInput() {
  const output = localStorage.getItem(LOCALSTORAGE_KEY);
  if (output) {
    const { email, message } = JSON.parse(output);
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}
updateInput();

function onSubmitBtn(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget.elements;
  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(LOCALSTORAGE_KEY);
  event.currentTarget.reset();
}
