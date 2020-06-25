const { fetch } = window;
const { href: URI } = window.location;
const socketURI = URI.split('/')
  .slice(0, -1)
  .join('/');
const socket = io(socketURI);

let usernameFromLocalStorage = localStorage.getItem('academy_chat_username');

const nwsFormatDate = date => {
  const dateFormat = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ].join('/');

  const timeFormat = [date.getHours(), date.getMinutes()].join(':');

  return [dateFormat, timeFormat].join(' ');
};

function createElement(options) {
  let el;
  let key;
  let i;

  if (!options.tagName) {
    el = document.createDocumentFragment();
  } else {
    el = document.createElement(options.tagName);

    if (options.className) {
      el.className = options.className;
    }

    if (options.attributes) {
      for (key in options.attributes) {
        if (Object.prototype.hasOwnProperty.call(options.attributes, key)) {
          el.setAttribute(key, options.attributes[key]);
        }
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
    for (i = 0; i < options.childs.length; i += 1) {
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
  const messagesElement = document.querySelector('div.messages__chat');
  const textElement = document.querySelector('input.messages__input');
  const buttonElement = document.querySelector('button.messages__send-btn');
  const usersConnectedElement = document.querySelector('b.connected-users');
  const perMinnuteElement = document.querySelector('b.per-minute');
  const totalMessagesElement = document.querySelector('b.total-messages');

  function scrollToBottom() {
    const div = messagesElement;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  function renderMessage(message) {
    const { username, text: messageText, timestamp } = message;
    const messageTimestamp = new Date(timestamp * 1000);
    const messageTimeFormat = nwsFormatDate(messageTimestamp);

    const messageElement = createElement({
      tagName: 'div',
      className: 'message',
      childs: [
        {
          tagName: 'div',
          className: 'message__img',
          attributes: {
            style: 'background-image: url(images/avatar.svg)',
          },
        },
        {
          tagName: 'div',
          className: 'message__bubble',
          childs: [
            {
              tagName: 'div',
              className: 'message__info',
              childs: [
                {
                  tagName: 'div',
                  className: 'message__info-name',
                  html: username,
                },
                {
                  tagName: 'div',
                  className: 'message__info-time',
                  html: messageTimeFormat,
                },
              ],
            },
            {
              tagName: 'div',
              className: 'message__text',
              html: messageText,
            },
          ],
        },
      ],
    });

    messagesElement.appendChild(messageElement);
    scrollToBottom();
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
  socket.on('server:analytics', ({ connected, perMinute, totalMessages }) => {
    usersConnectedElement.innerHTML = connected;
    perMinnuteElement.innerHTML = perMinute;
    totalMessagesElement.innerHTML = totalMessages;
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function start() {
    init();
  },
  false
);
