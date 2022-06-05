import throttle from 'lodash/throttle';

const form = document.querySelector('form');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputChange, 500));

populateText();

function onFormSubmit(event) {
  event.preventDefault();

  const submittedData = {
    email: event.currentTarget.email.value,
    message: event.currentTarget.message.value,
  };

  if (submittedData.email === '' || submittedData.message === '') {
    alert('Please fill all fields!');
    return;
  }

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(submittedData);
}

function onInputChange() {
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateText() {
  const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!localData) return;

  if (localData.email) form.email.value = localData.email;
  if (localData.message) form.message.value = localData.message;
}
