const template = books => {
  const html = books.reduce((htmlText, book) => {
    const { title, subtitle, description, author, isbn } = book;

    let text = htmlText;

    text += `
      <br>
      <div><b>${title}</b>: ${subtitle}</div>
      <p>${description}</p>
      <div><b>${author.name} ${author.surname}</b></div><br />
      <div>${isbn}</div>
      <br><br>
    `;

    return text;
  }, '');

  return html;
};

module.exports = template;
