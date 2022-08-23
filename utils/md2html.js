const { marked } = require('marked');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const mdParser = new marked.Parser();
function md2html() {
  const mdPath = path.resolve(path.join(root, './README.md'));
  const mdFile = fs.readFileSync(mdPath);
  let md = mdFile.toString();
  let html = marked.parse(md);
  return html;
}

module.exports = md2html;
