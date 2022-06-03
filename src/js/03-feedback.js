import throttle from 'lodash/throttle';

const email = document.querySelector('input');
const message = document.querySelector('textarea');
const form = document.querySelector('form');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputChange, 500));

populateText();

const formData = {};

function onFormSubmit(evt) {
  evt.preventDefault();

  if (email.value === '' || message.value === '')
    alert('Please fill required fields');

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onInputChange(event) {
  formData.email = email.value;
  formData.message = message.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateText() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  const parsedData = JSON.parse(savedMessage);
  if (!parsedData) {
    return;
  }
  if (parsedData) {
    email.value = parsedData.email;
    message.value = parsedData.message;
  }
}
