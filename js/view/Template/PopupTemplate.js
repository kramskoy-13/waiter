import Template from "./Template.js";

class PopupTemplate extends Template {
    constructor({ wrapper, template, message }) {
        super({ wrapper, template })
        this.message = message || null;
    }

    create(args) {
        let element;
        if(document.querySelector(".shadow-container__wrapper")) {
            element = document.querySelector(".shadow-container__wrapper");
            element.innerHTML = '';
        }
        else {
            element = document.createElement("div");
            element.className = "shadow-container__wrapper";
        }

        if (typeof this.template === "undefined") { console.error("template is undefined at PopupTemplate"); return }

        element.innerHTML = this.message ? this.template(this.message, args) : this.template(args);
        
        this.wrapper.appendChild(element);
        // this.wrapper.firstElementChild.classList.add("blur");
        [...this.wrapper.children].forEach( child => {
            if(child.className !== "shadow-container__wrapper") {child.classList.add("blur")}
        });

        if(this.listeners.length > 0) {
            this.listeners.forEach( elem => {
                const selector = document.querySelectorAll(elem.selector)
                if(!selector.length) {  console.error(`selector ${selector} wasn't found at [Popup class].`); return }
                selector.forEach( _elem => _elem.addEventListener(elem.listener, elem.callback))
            })
        }
        return this
    };

    destroy() {
        //this.wrapper.firstElementChild.classList.remove("blur");
        [...this.wrapper.children].forEach(child => {
            if (child.className !== "shadow-container__wrapper") { child.classList.remove("blur") }
        });
        let shadow = document.querySelector(".shadow-container__wrapper");
        if (shadow) {
            shadow.remove()
        }
    };
}
export default PopupTemplate;