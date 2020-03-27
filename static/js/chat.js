/* eslint-disable */

const fetch = window.fetch;
const { href: URI } = window.location;
const socketURI = URI.split('/')
  .slice(0, -1)
  .join('/');
const socket = io(socketURI);

let usernameFromLocalStorage = localStorage.getItem('academy_chat_username');

function createElement(options) {
  let el, a, i;

  if (!options.tagName) {
    el = document.createDocumentFragment();
  } else {
    el = document.createElement(options.tagName);

    if (options.className) {
      el.className = options.className;
    }

    if (options.attributes) {
      for (a in options.attributes) {
        el.setAttribute(a, options.attributes[a]);
      }
    }

    if (options.html !== undefined) {
      el.innerHTML = options.html;
    }
  }

  if (options.text) {
    el.appendChild(document.createTextNode(options.text));
  }

  if (options.childs && options.childs.length) {
    for (i = 0; i < options.childs.length; i++) {
      el.appendChild(
        options.childs[i] instanceof window.HTMLElement
          ? options.childs[i]
          : createElement(options.childs[i])
      );
    }
  }

  return el;
}

async function init() {
  const messagesElement = document.querySelector('.msger-chat');
  const textElement = document.querySelector('.msger-input');
  const buttonElement = document.querySelector('button.msger-send-btn');

  function renderMessage(message) {
    const { username, text: messageText, timestamp } = message;
    const messagesLength = messagesElement.querySelectorAll('.msg').length;
    const messageTimestamp = new Date(timestamp);
    const messageTimeFormat = `${messageTimestamp.getHours()}:${messageTimestamp.getMinutes()}`;
    const position = messagesLength % 2 === 0 ? 'left' : 'right';

    const messageElement = createElement({
      tagName: 'div',
      className: `msg ${position}-msg`,
      childs: [
        {
          tagName: 'div',
          className: 'msg-img',
          attributes: {
            style: 'background-image: url(images/avatar.svg)',
          },
        },
        {
          tagName: 'div',
          className: 'msg-bubble',
          childs: [
            {
              tagName: 'div',
              className: 'msg-info',
              childs: [
                {
                  tagName: 'div',
                  className: 'msg-info-name',
                  html: username,
                },
                {
                  tagName: 'div',
                  className: 'msg-info-time',
                  html: messageTimeFormat,
                },
              ],
            },
            {
              tagName: 'div',
              className: 'msg-text',
              html: messageText,
            },
          ],
        },
      ],
    });

    messagesElement.appendChild(messageElement);
  }

  if (!usernameFromLocalStorage) {
    const data = await fetch(`${URI}/username`).then(response =>
      response.json()
    );

    localStorage.setItem('academy_chat_username', data.username);
    usernameFromLocalStorage = data.username;
  }

  const history = await fetch(`${URI}/messages`).then(response =>
    response.json()
  );

  history.forEach((message, idx) =>
    renderMessage(message, idx % 2 > 0 ? 'right' : 'left')
  );

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
