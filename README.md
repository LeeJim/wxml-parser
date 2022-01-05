<p align="center">
    <img width="512" src="https://user-images.githubusercontent.com/7017290/148170109-70f1b3e4-1bd6-41f4-b1e7-c5e11dae3656.png" />
</p>
<p align="center">
    <a><img alt="npm" src="https://img.shields.io/npm/v/@leejim/wxml-parser"></a>
    <a><img alt="npm" src="https://img.shields.io/npm/dw/@leejim/wxml-parser"></a>
    <a><img alt="NPM" src="https://img.shields.io/npm/l/@leejim/wxml-parser"></a>
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

## 更新日志

- v0.1.2: 修复解析 wxs 时报错的问题
- v0.1.0: 初试版本上线
