export default class Template {
    constructor(parent, template) {
        this.parent = parent;
        this.template = template;
        this.listeners = [];
    }

    create() {
        Function.prototype()
    };

    initListener(selector, listener, callback) {
        this.listeners.push({
            selector, listener, callback
        })
        return this
    };

    handleListener({selector, listener, callback, action}) {
        if (action != "add" && action != "remove") {
            console.error("action type has not been defined at handleListener [Template class]");
            return;
        }
        const slct = document.querySelector(selector);
        if(!slct){
            console.error(`selector ${selector} wasn't found.`); return;
        }
        switch(action) {
            case "add"    : slct.addEventListener(listener, callback); break;
            case "remove" : slct.removeEventListener(listener, callback); break;
            default       : return;
        }   
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
        return this;
    };
    
    handleClass({selector, _class, action}) {
        if (action != "add" && action != "remove" && action != "toggle") {
            console.error("action type has not been defined at handleClass [Template class]");
            return;
        }
        let elem;
        if (typeof selector == "object") {
            elem = selector;
        }
        else if (typeof selector == "string") {
            elem = document.querySelector(selector);
        }
        else { console.error("impossible to define selector type at handleClass function [Template class]"); return; }
        switch(action) {
            case "add"    : elem.classList.add(_class); break;
            case "remove" : elem.classList.remove(_class); break;
            default       : elem.classList.toggle(_class);
        }
        return this;
    };

}

