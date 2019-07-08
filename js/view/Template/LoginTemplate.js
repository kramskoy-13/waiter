import Template from "./Template.js";
 
class LoginTemplate extends Template {
    constructor({parent, header, btn, template}){
        super(parent, template);
        this.header = header;
        this.btn = btn;
    }
    create() {
        if(!this.parent) { 
            console.error(`parent selector wasn't found at ${this.constructor.name}`); return;
        }; 

        this.parent.innerHTML = this.template(this.header, this.btn);

        this.listeners.forEach( obj => {
            const selector = document.querySelector(obj.selector)
            if(!selector) { 
                console.error(`selector ${selector} wasn't found.`); return;
             }
            selector.addEventListener(obj.listener, obj.callback)
        });
        setTimeout( () => {
            let container = document.querySelector('.initial-login__container');
            container.classList.remove('scale-down');
        },300);
    };

    removeLoginErrors() {
        let notifications = document.querySelectorAll(".initial-login__notification");
        for(let notification of notifications) {
            notification.classList.remove('error');
            notification.classList.remove('opened');
			notification.innerHTML = '!';
        };
        document.removeEventListener("click", this.toggleLoginErrors);
    };

    showLoginErrors(errors) {
        errors.forEach( elem => {
            let selector = document.getElementById(elem.id).nextElementSibling;
            this.appendElement({tag:"div", parentSelector:selector, text:elem.message})
				.handleClass({selector, _class:"error", action:"add"})
				.handleClass({selector, _class:"opened", action:"add"});
        });	
        setTimeout( () => {
            document.addEventListener("click", this.toggleLoginErrors);
        }, 500)
    };

    toggleLoginErrors(event) {
        console.log(`callback fires`);
        if(event.target && event.target.classList.contains("initial-login__notification")) {
            event.target.classList.toggle("opened");
        } 
        else {
            let notifications = document.querySelectorAll(".initial-login__notification");
            notifications.forEach( elem => {
                elem.classList.remove("opened")
            })
        }
    };
}
export default LoginTemplate;