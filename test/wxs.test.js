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
let newWXML = ''
const parseHanlder = {
    onopentag(tagname, attrs, isSelfClosing) {
        newWXML += `<${tagname}${Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`)}${isSelfClosing ? ' /' : ''}>`
    },
    onclosetag(tagname) {
        newWXML += `</${tagname}>`
    },
    ontext(text) {
        newWXML += text;
    },
    onwxs(wxs) {
        newWXML += wxs;
    }
};

test('parse wxs', () => {
    newWXML = ''
    let parser = new Parser(parseHanlder);

    parser.write(rawWXML)
    expect(newWXML).toBe(rawWXML)
})

test('parse complex wxs', () => {
    newWXML = ''
    let rawWXML = `
    <wxs src="./index.wxs" />
    <wxs module="lodash">
    var foo = "'hello world' from tools.wxs";
    var bar = function (a, b) {
      return a < b ? a : b;
    }
    
    module.exports = {
      FOO: foo,
      bar: bar,
    };
    module.exports.msg = "some msg"; 
    </wxs>`
    let parser = new Parser(parseHanlder);

    parser.write(rawWXML)
    expect(newWXML).toBe(rawWXML)
})