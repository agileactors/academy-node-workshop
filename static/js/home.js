/* eslint-disable */
const { href: URI } = window.location;

async function init() {
  const enterElement = document.querySelector('a.btn-enter');
  const usernameInputElement = document.querySelector('input.username');

  usernameInputElement.addEventListener('keypress', event => {
    usernameInputElement.classList.remove('error');
  });

  enterElement.addEventListener('click', event => {
    event.preventDefault();

    const { value: username } = usernameInputElement;

    if (username) {
      localStorage.setItem('academy_chat_username', usernameInputElement.value);
      window.location = '/chat';

      return false;
    }

    usernameInputElement.classList.add('error');
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function() {
    init();
  },
  false
);
