const glob = require('glob');
const fs = require('fs');
let assert = require('assert').strict;
let Parser = require('./index');

const parse = (str) => {
    let ans = '';
    let parser = new Parser({
        onopentag(tagname, attrs, isSelfClosing) {
            // console.log('open tag', tagname);
            // console.log('attrs', attrs);
            ans += `<${tagname}${Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`)}${isSelfClosing ? ' /' : ''}>`
        },
        onclosetag(tagname) {
            // console.log('close tag', tagname);
            ans += `</${tagname}>`
        },
        ontext(text) {
            // console.log('text', text);
            ans += text;
        },
        oncomment(cmt) {
            ans += `<!--${cmt}-->`
        },
        ontemplate(tmp) {
            console.log('template', tmp);
            ans += `{{${tmp}}}`
        },
        onwxs(wxs) {
            // console.log('wxs', wxs);
            ans += wxs
        }
    });
    parser.write(str)
    return ans
}

glob('../tdesign-miniprogram/{src,_example}/**/badge/*.wxml', (err, files) => {
  files.forEach(item => {
    try {
      const content = fs.readFileSync(item, { encoding: 'utf-8'})
      assert.ok(parse(content) == content)
    } catch {
      console.log(item);
    }
  })
})