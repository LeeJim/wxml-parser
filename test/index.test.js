let Parser = require('../index');
let rawWXML = `
<view a="1"></view>
<!-- test -->
<view>{{ a > 2 ? 'as' : '12' }}</view>
<import src="abc"></import>
<view>zxc{{ middle }}asdasd</view>`

test('解析和还原WXML', () => {
    let newWXML = ''
    let parser = new Parser({
        onopentag(tagname, attrs) {
            console.log('open tag', tagname);
            console.log('attrs', attrs);
            newWXML += `<${tagname}${attrs.map(item => ` ${item.key}="${item.val}"`)}>`
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
        }
    });
    parser.write(rawWXML)
    expect(newWXML).toBe(rawWXML)
})