const fs = require('fs');
const path = require('path');
const logger = require('../libraries/logger');

// task: working with path, fs modules
// task: use the process global

// get root directory
const rootDir = process.cwd();

// get the templates folder
const tplDir = path.join(rootDir, 'templates');

/**
 * Get the template for the specified route
 * bind data using placeholders {{mark}}
 * @param {*} tpl
 * @param {*} data
 */
const getTemplate = (route, data, buildFn) => {
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

      html = html.replace(
        placeHolder,
        buildFn ? buildFn.call(null, data[prop]) : ''
      );

      return html;
    }, templateContentsHtml);

    return htmlResult;
  } catch (err) {
    logger.log(err);
    return false;
  }
};

module.exports = getTemplate;
