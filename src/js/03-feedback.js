import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';
function onFormInput(evt) {
  let formInfo = localStorage.getItem(FORM_KEY);
  formInfo = formInfo ? JSON.parse(formInfo) : {};
  formInfo[evt.target.name] = evt.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formInfo));
}
formElement.addEventListener('input', throttle(onFormInput, 500));

function handlerFillForm() {
  let saveInfo = localStorage.getItem(FORM_KEY);
  if (saveInfo) {
    saveInfo = JSON.parse(saveInfo);
    Object.entries(saveInfo).forEach(([key, text]) => {
      formElement.elements[key].value = text;
    });
  }
}
handlerFillForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Fill all the fields');
  } else {
    let formData = JSON.parse(localStorage.getItem(FORM_KEY));
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
    formData = {};
  }
}
formElement.addEventListener('submit', onFormSubmit);
