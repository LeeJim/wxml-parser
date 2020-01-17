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
    onopentag(tagname, attrs) {},

    onclosetag(tagname) {},

    ontext(text) {},

    oncomment(cmt) {},

    ontemplate(tmp) {}
});
parser.write('<view>test</view>');
```

## 更新日志

-   2020.1.16 v0.1 版本上线
