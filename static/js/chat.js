/* eslint-disable */

const fetch = window.fetch;
const { href: URI } = window.location;
const socketURI = URI.split('/')
  .slice(0, -1)
  .join('/');
const socket = io(socketURI);

let usernameFromLocalStorage = localStorage.getItem('academy_chat_username');

async function init() {
  const formElement = document.querySelector('#form');
  const messagesElement = document.querySelector('#messages');
  const textElement = document.querySelector('input.message-text');
  const buttonElement = document.querySelector('button.send-button');

  function renderMessage(message) {
    const { username } = message;
    const messageElement = document.createElement('li');

    messageElement.innerHTML = `${message.username}: ${message.text}`;
    messageElement.style['color'] =
      usernameFromLocalStorage === username ? 'green' : 'red';
    messagesElement.appendChild(messageElement);
  }

  if (!usernameFromLocalStorage) {
    const data = await fetch(`${URI}/username`).then(response =>
      response.json()
    );

    console.log(`Got username ${data.username}`);

    localStorage.setItem('academy_chat_username', data.username);
    usernameFromLocalStorage = data.username;
  }

  const history = await fetch(`${URI}/messages`).then(response =>
    response.json()
  );

  history.forEach(message => renderMessage(message));

  buttonElement.addEventListener('click', event => {
    event.preventDefault();

    const text = textElement.value;

    if (text) {
      socket.emit('client:message', {
        text,
        username: usernameFromLocalStorage,
      });
      textElement.value = '';
    }

    return false;
  });

  socket.on('server:message', message => renderMessage(message));
  socket.on('server:analytics', data => console.log);
}

document.addEventListener(
  'DOMContentLoaded',
  function() {
    init();
  },
  false
);
