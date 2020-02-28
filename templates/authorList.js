const template = authors => {
  const html = authors.reduce((htmlText, author) => {
    const { name, surname } = author;

    let text = htmlText;

    text += `<div>${name} ${surname}</div>`;

    return text;
  }, '');

  return html;
};

module.exports = template;
