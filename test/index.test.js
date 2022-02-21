let Parser = require('../index');
let rawWXML = `
<view a="1"></view>
<!-- test -->
<view>{{ a > 2 ? 'as' : '12' }}</view>
<import src="abc"></import>
<wxs src="./index.wxs" />
<view>zxc{{ middle }}asdasd</view>`

test('base', () => {
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
        oncomment(cmt) {
            newWXML += `<!--${cmt}-->`
        },
        ontemplate(tmp) {
            console.log('template', tmp);
            newWXML += `{{${tmp}}}`
        },
        onwxs(wxs) {
            console.log('wxs', wxs);
        }
    });
    console.log(newWXML);
    parser.write(rawWXML)
    expect(newWXML).toBe(rawWXML)
})