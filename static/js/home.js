/* eslint-disable */
const { href: URI } = window.location;

async function init() {
  const enterElement = document.querySelector('a.btn-enter');
  const usernameInputElement = document.querySelector('input.username');

  enterElement.addEventListener('click', event => {
    event.preventDefault();

    localStorage.setItem('academy_chat_username', usernameInputElement.value);
    window.location = '/chat';
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function() {
    init();
  },
  false
);
