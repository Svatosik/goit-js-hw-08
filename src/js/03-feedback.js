import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';
function onFormInput(event) {
  let formInfo = localStorage.getItem(FORM_KEY);
  formInfo = formInfo ? JSON.parse(formInfo) : {};
  formInfo[event.target.name] = event.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formInfo));
}
function handlerFillForm() {
  let saveInfo = localStorage.getItem(FORM_KEY);
  if (saveInfo) {
    saveInfo = JSON.parse(saveInfo);
    Object.entries(saveInfo).forEach(([key, text]) => {
      formElement.elements[key].value = text;
    });
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Fill all the fields');
  } else {
    let formData = JSON.parse(localStorage.getItem(FORM_KEY));
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
    formData = {};
  }
}

formElement.addEventListener('input', throttle(onFormInput, 500));
handlerFillForm();
formElement.addEventListener('submit', onFormSubmit);
