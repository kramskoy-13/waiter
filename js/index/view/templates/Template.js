export default class Template {
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
    };

    removeListener(selector, listener, callback) {
        const slct = document.querySelector(selector);
        if(!slct){
            console.log(`selector ${selector} wasn't found.`); return;
        }
        slct.removeEventListener(listener, callback)
    };

    appendElement(tag, parentSelector, txt) {
        let notification = document.createElement(tag),
            parent;

        if (typeof parentSelector == "object") {
            parent = parentSelector;
        }
        else if (typeof parentSelector == "string") {
            parent = document.querySelector(parentSelector);
        }
        else { console.error("impossible to define parent type at appendElement function [Template class]"); return; }

        notification.innerText = txt;
        parent.appendChild(notification);
    };

    handleClass(selector, _class, action) {
        if (action != "add" && action != "remove") {
            console.error("action type has not been defined at handleClass [Template class]"); return;
        }

        let elem;
        if (typeof selector == "object") {
            elem = selector;
        }
        else if (typeof selector == "string") {
            elem = document.querySelector(selector);
        }
        else { console.error("impossible to define selector type at handleClass function [Template class]"); return; }
        action == "add" ? elem.classList.add(_class) : elem.classList.remove(_class);
        return this;
    };

}

//module.exports = Template;