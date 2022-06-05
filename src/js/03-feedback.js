import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

addLocalData();

const formData = {
  email: form.email.value,
  message: form.message.value,
};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput({ target: { name, value } }) {
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

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

  console.log(submittedData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

function addLocalData() {
  const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!localData) return;

  if (localData.email) form.email.value = localData.email;
  if (localData.message) form.message.value = localData.message;
}
