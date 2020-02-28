const template = book => {
  const { title, subtitle, description, authors, isbn } = book;

  const html = `
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

  return html;
};

module.exports = template;
