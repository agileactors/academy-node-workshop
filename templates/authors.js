const template = authors => {
  const html = authors.reduce((htmlText, book) => {
    const { name, surname } = book;

    let text = htmlText;

    text += `<div>${name}</b>: ${surname}</div>`;

    return text;
  }, '');

  return html;
};

module.exports = template;
