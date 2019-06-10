class Template {
    constructor(parent) {
        this.parent = parent;
        this.listeners = [];
    }

    create() {
        Function.prototype
    }

    initListener(selector, listener, callback) {
        this.listeners.push({
            selector, listener, callback
        })
    }

    addListener(selector, listener, callback) {
        const slct = document.querySelector(selector);
        if(!slct){
            console.log(`selector ${selector} wasn't found.`); return;
        }
        slct.addEventListener(listener, callback)
    }

    removeListener(selector, listener, callback) {
        const slct = document.querySelector(selector);
        if(!slct){
            console.log(`selector ${selector} wasn't found.`); return;
        }
        slct.removeEventListener(listener, callback)
    }

}

module.exports = Template;