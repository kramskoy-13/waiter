export default class Template {
    constructor({ parent, template }) {
        this.parent = parent;
        this.template = template;
        this.listeners = [];
        this.children = [];
    }

    create(args = {}) {
        if (!this.parent) {
            console.error(`parent selector wasn't found at ${this.constructor.name}`); return;
        }
        if (typeof this.parent === "object") {
            this.parent.innerHTML = this.template(args); // <-- name of object inside create function should be equal to the corresponding arguments inside template
        }
        else if (typeof this.parent === "string") {
            let parent = document.getElementById(this.parent)
            parent.innerHTML = this.template(args);
        }
        
        if (this.listeners.length) {
            this.listeners.forEach(obj => {
                const selector = document.querySelector(obj.selector)
                if (!selector) {
                    console.error(`selector ${selector} wasn't found.`); return;
                }
                selector.addEventListener(obj.listener, obj.callback)
            });
        }

    };

    initListener({ selector, listener, callback }) {
        this.listeners.push({
            selector, listener, callback
        })
        return this
    };

    createChildren() {
        if (this.children.length) {
            this.children.forEach(childCreateFunc => {
                if (typeof childCreateFunc === "function") {
                    childCreateFunc()
                }
                else {
                    console.error(childCreateFunc, "is not a function")
                }
            })
        }
    };

    addChild(child) {
        this.children.push(child)
        return this
    };

    handleListener({ selector, listener, callback, action }) {
        if (action != "add" && action != "remove") {
            console.error("action type has not been defined at handleListener [Template class]");
            return;
        }
        const slct = document.querySelectorAll(selector);
        if(!slct.length){
            console.error(`selector ${selector} wasn't found.`); return;
        }
        switch(action) {
            case "add"    : slct.forEach(s => s.addEventListener(listener, callback) ); break;
            case "remove" : slct.forEach(s => s.removeEventListener(listener, callback) ); break;
            default       : return;
        }   
    };

    appendElement({tag, parentSelector, text}) {
        let elem = document.createElement(tag),
            parent;

        if (typeof parentSelector == "object") {
            parent = parentSelector;
        }
        else if (typeof parentSelector == "string") {
            parent = document.querySelector(parentSelector);
        }
        else { console.error("impossible to define parent type at appendElement function [Template class]"); return; }

        elem.innerText = text;
        parent.appendChild(elem);
        return this;
    };

    appendTemplate({template, parentSelector }) {
        if (typeof parentSelector == "object") {
            parent = parentSelector;
        }
        else if (typeof parentSelector == "string") {
            parent = document.querySelector(parentSelector);
        }
    };

    handleClass({selector, _class, action }) {
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

