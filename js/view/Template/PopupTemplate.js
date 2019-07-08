import Template from "./Template.js";

class PopupTemplate extends Template {
    constructor(parent, template, message) {
        super(parent, template)
        this.message = message || null;
    }

    create() {
        let element;
        if(document.querySelector(".shadow-container__wrapper")) {
            element = document.querySelector(".shadow-container__wrapper");
            element.innerHTML = '';
        }
        else {
            element = document.createElement("div");
            element.className = "shadow-container__wrapper";
        }
        
        element.innerHTML = this.message ? this.template(this.message) : this.template();
        
        this.parent.appendChild(element);
        // this.parent.firstElementChild.classList.add("blur");
        [...this.parent.children].forEach( child => {
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
        this.parent.firstElementChild.classList.remove("blur");
        document.querySelector(".shadow-container__wrapper").remove();
    };
}
export default PopupTemplate;