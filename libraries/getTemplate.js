const fs = require('fs');
const path = require('path');
const logger = require('../libraries/logger');
/**
 * Find html for specific route
 * @param {*} tpl
 * @param {*} data
 */

// task: working with path, fs modules
// task: use the process global

// get root directory
const rootDir = process.cwd();

// get the templates folder
const tplDir = path.join(rootDir, 'templates');

/**
 * Build html with data
 * @param {*} data
 * data<Array | String | Number>
 */

const buildHtml = (data, htmlTag = 'div') => {
  const isArray = Array.isArray(data);
  const html = isArray
    ? data.reduce((htmlText, author) => {
        const { name, surname } = author;

        let text = htmlText;

        text += `${name} ${surname}</${htmlTag}>`;

        return text;
      }, '')
    : data;

  return `<${htmlTag}>${html}</${htmlTag}>`;
};

/**
 * Get the template for the specified route
 * bind data using placeholders {{mark}}
 * @param {*} tpl
 * @param {*} data
 */
const getTemplate = (route, data) => {
  try {
    const [parent, child] = route.split(':');
    const directory = path.join(tplDir, parent);
    const templateContentsHtml = fs.readFileSync(
      path.join(directory, `${child}.html`),
      {
        encoding: 'utf8',
      }
    );

    const regxp = /\{(.*?)\}/g; // find all occurences between { }
    const matches = templateContentsHtml.match(regxp); // get the matches against the html template contents

    const htmlResult = matches.reduce((acc, placeHolder) => {
      const prop = placeHolder.substring(1, placeHolder.length - 1); // remove markers {{ }}
      let html = acc;

      if (!data[prop]) {
        return html;
      }

      html = html.replace(placeHolder, buildHtml(data[prop]));

      return html;
    }, templateContentsHtml);

    return htmlResult;
  } catch (err) {
    logger.log(err);
    return false;
  }
};

module.exports = getTemplate;
