<p align="center">
    <img width="512" src="https://user-images.githubusercontent.com/7017290/148170109-70f1b3e4-1bd6-41f4-b1e7-c5e11dae3656.png" />
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@leejim/wxml-parser"><img alt="npm" src="https://img.shields.io/npm/v/@leejim/wxml-parser"></a>
    <a href="https://www.npmjs.com/package/@leejim/wxml-parser"><img alt="npm" src="https://img.shields.io/npm/dw/@leejim/wxml-parser"></a>
    <a href="https://www.npmjs.com/package/@leejim/wxml-parser"><img alt="NPM" src="https://img.shields.io/npm/l/@leejim/wxml-parser"></a>
</p>

## wxml-parser

微信小程序 WXML Parser

## 安装

```bash
npm install -D @leejim/wxml-parser
```

## 使用

```js
var WXMLParser = require('@leejim/wxml-parser');
var parser = new WXMLParser({
    onopentag(tagname, attrs, isSelfClosing) {},

    onclosetag(tagname) {},

    ontext(text) {},

    oncomment(cmt) {},

    ontemplate(tmp) {}
});
parser.write('<view>test</view>');
```

## 参数

### onopentag

参数名|数据类型|描述
--|--|--
tagname | `string` | 标签名
attrs | `Array<string|AttrEntity>; interface AttrEntity { key: string; value: string } ` | 单值时只返回 `key`；否则返回 `key`` 和 `value`
isSelfClosing | `boolean` | 是否自闭合标签