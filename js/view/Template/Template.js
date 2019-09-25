export default class Template {
    constructor({ wrapper, template }) {
        this.wrapper = wrapper;
        this.template = template;
        this.listeners = [];
        this.children = [];
    }

    create(args = {}) {
        /// AS A PARENT EITHER ID OR NODE SHOULD BE PASSED ///
        if (!this.wrapper) return console.error(`wrapper selector wasn't found at ${this.constructor.name}`);
          
        if (typeof this.wrapper === "object") this.wrapper.innerHTML = this.template(args); // <-- name of object inside create function should be equal to the corresponding arguments inside template
        
        else if (typeof this.wrapper === "string") {
            let wrapper = document.getElementById(this.wrapper)

            if (!wrapper) throw new Error("Only id or html node should be passed as a wrapper.");

            wrapper.innerHTML = this.template(args);
        }
        
        if (this.listeners.length) {
            this.listeners.forEach(obj => {
                const selector = document.querySelectorAll(obj.selector)
                if (!selector.length) return console.error(`selector ${selector} wasn't found.`);
                   
                selector.forEach(e => e.addEventListener(obj.listener, obj.callback))
            });
        }

    };
    /// ADD LISTENERS WHEN CREATING HTML MARKUP ///
    initListener({ selector, listener, callback }) {
        this.listeners.push({
            selector, listener, callback
        })
        return this
    };

    createChildren() {
        if (this.children.length) {
            this.children.forEach(childCreateFunc => {
                if (typeof childCreateFunc === "function") childCreateFunc();
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

    /// ADD LISTENERS AFTER HTML MARKUP HAS BEEM CREATED ///

    handleListener({ selector, listener, callback, action }) {
        if (action != "add" && action != "remove") {
            console.error("action type has not been defined at handleListener [Template class]");
            return;
        }
        const slct = document.querySelectorAll(selector);

        if (!slct.length) return console.error(`selector ${selector} wasn't found.`); 

        switch(action) {
            case "add"    : slct.forEach(s => s.addEventListener(listener, callback) ); break;
            case "remove" : slct.forEach(s => s.removeEventListener(listener, callback) ); break;
            default       : return;
        }   
        return this
    };

    appendElement({tag, parentSelector, text}) {
        let elem = document.createElement(tag),
            parent;

        if (typeof parentSelector == "object") parent = parentSelector;
        
        else if (typeof parentSelector == "string") parent = document.querySelector(parentSelector);
        
        else return console.error("impossible to define parent type at appendElement function [Template class]");  

        elem.innerText = text;
        parent.appendChild(elem);
        return this;
    };

    appendTemplate({template, parentSelector }) {
        if (typeof parentSelector == "object")  parent = parentSelector;
      
        else if (typeof parentSelector == "string")  parent = document.querySelector(parentSelector);
    };

    handleClass({selector, _class, action}) {
        if (action != "add" && action != "remove" && action != "toggle") return console.error("action type has not been defined at handleClass [Template class]");

        let elem;
        if (typeof selector == "object") elem = selector;
        
        else if (typeof selector == "string")  elem = document.querySelector(selector);
        
        else  return console.error("impossible to define selector type at handleClass function [Template class]"); 
        switch(action) {
            case "add"    : elem.classList.add(_class); break;
            case "remove" : elem.classList.remove(_class); break;
            default       : elem.classList.toggle(_class);
        }
        return this;
    };

}

