const template = books => {
  const html = books.reduce((htmlText, book) => {
    const { title, subtitle, description, authors, isbn } = book;

    let text = htmlText;

    text += `
      <br>
      <div><b>${title}</b></div>
      <div><b>${subtitle}</b></div>
      <p>${description}</p>
      <ul>
        ${authors.map(({ name, surname }) => `<li>${name} ${surname}</li>`)}
      </ul>
      <div>${isbn}</div>
      <br><br>
    `;

    return text;
  }, '');

  return html;
};

module.exports = template;
