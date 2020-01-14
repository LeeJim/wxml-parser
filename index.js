let assert = require('assert').strict;

let handlerCompany = function(type, ...args) {
    if (typeof this.handlers['on' + type] === 'function') {
        this.handlers['on' + type](...args)
    }
}

class WXMLParser {
    constructor(handlers) {
        this.handlers = handlers || {}
    }

    write(source) {
        this.inputs = source;
        this.len = source.length || 0;
        this.pos = 0;
        this.parseNodes();
    }

    getNextChar() {
        return this.inputs[this.pos];
    }

    startWiths(str) {
        return this.inputs.substr(this.pos, str.length) === str;
    }

    isEOF() {
        return this.pos >= this.len;
    }

    // consume

    consumeChar() {
        return this.inputs[this.pos++];
    }

    consumeWhile(matchFunc) {
        let result = '';
        while (!this.isEOF() && matchFunc(this.getNextChar())) {
            result += this.consumeChar();
        }
        return result;
    }

    consumeWhitespace() {
        return this.consumeWhile((char) => /\s/.test(char));
    }

    // parse
    parseNodes() {
        while(!this.isEOF() && !this.startWiths('</')) {
            this.parseNode()
        }
    }

    parseNode() {
        let nextChar = this.getNextChar();
        switch (nextChar) {
            case '{':
                this.parseTemplate();
                break;
            case '<':
                if (this.startWiths('<!--')) {
                    let comment = this.parseComment();
                    console.log('comment:', comment);
                    return;
                }
                // open tag
                this.parseElement();
                break;
            default:
                this.parseText();
        }
    }

    parseTemplate() {
        assert.ok(this.consumeChar() == '{')
        assert.ok(this.consumeChar() == '{')
        let template = this.consumeWhile((char) => char !== '}')
        handlerCompany.call(this,'template', template)
        assert.ok(this.consumeChar() == '}')
        assert.ok(this.consumeChar() == '}')
    }

    parseText() {
        let text = this.consumeWhile((char) => /[^<{]/.test(char))
        // console.log('text', encodeURIComponent(text));
        handlerCompany.call(this,'text', text)
        return text;
    }

    parseComment() {
        assert.ok(this.consumeChar() == '<')
        assert.ok(this.consumeChar() == '!')
        assert.ok(this.consumeChar() == '-')
        assert.ok(this.consumeChar() == '-')
        let comment = this.consumeWhile((char) => char !== '-')
        handlerCompany.call(this,'comment', comment)
        assert.ok(this.consumeChar() == '-')
        assert.ok(this.consumeChar() == '-')
        assert.ok(this.consumeChar() == '>')
        return comment
    }

    parseElement() {
        // open tag
        assert.ok(this.consumeChar() === '<')
        let tagName = this.parseTagName();
        let attrs = this.parseAttrs();
        let isSelfClosing = false;
        // console.log('open', tagName);
        // console.log('attrs', attrs || 'empty');
        
        this.consumeWhitespace();
        if (this.getNextChar() === '/') {
            // selfClosing
            isSelfClosing = true;
        }
        handlerCompany.call(this,'opentag', tagName, attrs)
        this.consumeWhile((char) => char !== '>')
        assert.ok(this.consumeChar() == '>')
        if (isSelfClosing) {
            handlerCompany.call(this,'closetag', tagName, true)
            return;
        }

        this.parseNodes();
        
        assert.ok(this.consumeChar() == '<')
        assert.ok(this.consumeChar() == '/')
        // console.log('close', this.parseTagName())
        let closeTagName = this.parseTagName()
        handlerCompany.call(this,'closetag', closeTagName, false)
        assert.ok(this.consumeChar() == '>')
    }

    parseTagName() {
        return this.consumeWhile((char) => /[a-zA-Z-]/.test(char));
    }

    parseAttrs() {
        this.consumeWhitespace()
        let attrs = []
        while(/[^/>]/.test(this.getNextChar())) {
            let key = this.consumeWhile(char => char !== '=');
            assert.ok(this.consumeChar() == '=')
            this.consumeWhitespace();
            assert.ok(this.consumeChar() == '"')
            let val = this.consumeWhile(char => char !== '"')
            assert.ok(this.consumeChar() == '"')
            attrs.push({key, val})
            this.consumeWhitespace()
        }
        return attrs
    }
}

module.exports = WXMLParser
