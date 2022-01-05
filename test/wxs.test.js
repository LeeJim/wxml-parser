let Parser = require('../index');

let rawWXML = `
<wxs src="./index.wxs" />
<wxs module="lodash">
var foo = "'hello world' from tools.wxs";
var bar = function (d) {
  return d;
}
module.exports = {
  FOO: foo,
  bar: bar,
};
module.exports.msg = "some msg"; 
</wxs>`

test('parse wxs', () => {
    let newWXML = ''
    let parser = new Parser({
        onopentag(tagname, attrs, isSelfClosing) {
            console.log('open tag', tagname);
            console.log('attrs', attrs);
            newWXML += `<${tagname}${Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`)}${isSelfClosing ? ' /' : ''}>`
        },
        onclosetag(tagname) {
            console.log('close tag', tagname);
            newWXML += `</${tagname}>`
        },
        ontext(text) {
            console.log('text', text);
            newWXML += text;
        },
        onwxs(wxs) {
            console.log('wxs', wxs);
            newWXML += wxs;
        }
    });
    console.log(newWXML);
    parser.write(rawWXML)
    expect(newWXML).toBe(rawWXML)
})