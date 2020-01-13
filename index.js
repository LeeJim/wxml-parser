

class WXMLParser {
    constructor(inputs) {
        this.inputs = inputs;
        this.len = inputs.length || 0;
        this.pos = 0;
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
        let result = [];
        while (!this.isEOF() && matchFunc(this.getNextChar())) {
            result.push(this.consumeChar());
        }
        return result.join('');
    }

    consumeWhitespace() {
        return this.consumeWhile((char) => !/\s/.test(char));
    }

    // parse
    parse() {
        while(!this.isEOF()) {
            this.parseNode()
        }
    }

    parseNode() {
        let nextChar = this.getNextChar();
        if (nextChar == '<') {
            this.consumeChar()
            if (this.startWiths('!--')) {
                let comment = this.parseComment();
                console.log('comment:', comment);
                return;
            }
            if (this.getNextChar() === '/') {
                // close tag
                this.consumeChar();
                let closeTag = this.parseTagName();
                console.log('close tag', closeTag);
                this.consumeChar();
                return;
            }
            // open tag
            this.parseElement();
            return
        }
        this.parseText();
    }

    parseText() {
        let text = this.consumeWhile((char) => char !== '<')
        console.log('text', text);
        return text;
    }

    parseComment() {
        let comment = this.consumeWhile((char) => char !== '>')
        return comment.slice(3, -2)
    }

    parseElement() {
        // open tag
        let tagName = this.parseTagName();
        let attrs = this.parseAttrs();
        console.log('open', tagName);
        console.log('attrs', attrs || 'empty');
        
        this.consumeWhile((char) => /\s/.test(char))
        if (this.getNextChar() === '/') {
            // selfClosing
        }
        this.consumeWhile((char) => char !== '>')
    }

    parseTagName() {
        return this.consumeWhile((char) => /[a-zA-Z-]/.test(char));
    }

    parseAttrs() {
        let attrs = this.consumeWhile((char) => /[^/>]/.test(char));
        attrs = attrs.trim();
        if (attrs) {
            return attrs.split(' ').map(item => {
                let [key, val] = item.split('=');
                return {key, val}
            })
        }
    }
}

function parse(inputs, options) {
    let parser = new WXMLParser(inputs);
    parser.parse()
};

// module.exports = parse

parse(`
<view a="1"></view>
<!-- test -->
<import src="abc"/>
<view>zxc</view>`)
