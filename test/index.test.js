let Parser = require('../index');
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
            // console.log('template', tmp);
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

test('base', () => {
    let origin = `
    <view a="1"></view>
    <!-- test -->
    <view>{{ a > 2 ? 'as' : '12' }}</view>
    <import src="abc"></import>
    <wxs src="./index.wxs" />
    <view>zxc{{ middle }}asdasd</view>`
    let final = parse(origin)
    expect(final).toBe(origin)
})

test('tag name with whitespace', () => {
    let origin = `<view>aaa</view
    >`
    let final = parse(origin)
    expect(final).toBe(origin.replace(/\s/g, ''))
})

test('tag name with number', () => {
    let origin = `<dialog-v2>aaa</dialog-v2>`
    let final = parse(origin)
    console.log(final);
    expect(final).toBe(origin)
})