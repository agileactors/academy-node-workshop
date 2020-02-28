const template = book => {
  const { title, subtitle, description, author, isbn } = book;

  const html = `
    <br>
    <div><b>${title}</b>: ${subtitle}</div>
    <p>${description}</p>
    <div><b>${author.name} ${author.surname}</b></div><br />
    <div>${isbn}</div>
    <br><br>
  `;

  return html;
};

module.exports = template;
