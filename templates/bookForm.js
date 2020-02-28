const template = authors => {
  const html = `
    <form action="/books" method="POST">
      <h2>Add new book</h2>

      <label>Title</label><br />
      <input type="text" style="width: 300px" name="title" /><br/><br/>

      <label>Subtitle</label><br />
      <input type="text" style="width: 300px" name="subtitle" /><br/><br/>

      <label>Description</label><br />
      <textarea name="description" style="width: 300px; height: 100px;"></textarea><br /><br />

      <label>Author</label><br />
      <select name="author">
        ${authors.map(
          ({ _id, name, surname }) =>
            `<option value="${_id}">${name} ${surname}</option>`
        )}
      </select>
      <br/><br/>

      <label>ISBN</label><br />
      <input type="text" style="width: 300px" name="isbn" /><br/><br/>

      <input type="submit" value="submit" />
    </form>
  `;

  return html;
};

module.exports = template;
