/**
 * Simple HTML template engine
 */

const fs = require('fs');
const path = require('path');
const { get } = require('lodash');

// get root directory
const rootDir = process.cwd();

// get templates folder
const templateDir = path.join(rootDir, 'templates');

const VAR_REGEX = /\{\{(?:(?!\}\})(?:.|\n))*\}\}/g;
const LOOP_REGEX = /\{%(?:(?!%\})(?:.|\n))*%\}(?:(?!\{%\})(?:.|\n))*\{%\}/g;
const LOOP_VAR_REGEX = /\{%(?:(?!%\})(?:.|\n))*%\}/g;

// clean variable from engine syntax
const clean = str => str.substring(2, str.length - 2).trim();

const renderVars = (template = '', data = {}) => {
  const matches = template.match(VAR_REGEX);

  return matches.reduce((html, placeholder) => {
    const prop = clean(placeholder);
    const value = get(data, prop); // get value even if it's nested
    return value ? html.replace(placeholder, value) : html;
  }, template);
};

const renderLoops = (template = '', data = {}) => {
  const matches = template.match(LOOP_REGEX);

  return matches.reduce((html, loop) => {
    // get loop's variable name
    const loopName = loop.match(LOOP_VAR_REGEX)[0];
    const prop = clean(loopName);

    // clean html from template's loop syntax {% * %} * {%}
    const cleanTemplate = loop.substring(
      loop.indexOf('}') + 1,
      loop.lastIndexOf('{')
    );

    if (!data[prop]) {
      return html;
    }

    // build html for each element in loop
    const renderedLoop = data[prop].reduce(
      (acc, item) => acc + renderVars(cleanTemplate, item),
      ''
    );

    return html.replace(loop, renderedLoop);
  }, template);
};

const render = (filename, data = {}) => {
  // path to find template
  const filePath = path.join(templateDir, `${filename}.html`);

  // template contents
  const template = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });

  const html = renderLoops(
    // prettier-ignore
    renderVars(template, data),
    data
  );
  return html;
};

module.exports = { render };
