import Template from "./Template.js";
 
class LoginTemplate extends Template {
    constructor({ wrapper, header, button, template}){
        super({ wrapper, template });
        this.header = header;
        this.button = button;
        this.hasErrors = false;
        this.callback = this.toggleLoginErrors.bind(this);
    }
    create() {
        super.create({ header: this.header, button: this.button }); 

        setTimeout( () => {
            let container = document.querySelector('.initial-login__container');
            container.classList.remove('scale-down');
        },300);
    };

    removeLoginErrors() {
        this.hasErrors = false;
        let notifications = document.querySelectorAll(".initial-login__notification");
        for(let notification of notifications) {
            notification.classList.remove('error');
            notification.classList.remove('opened');
			notification.innerHTML = '!';
        };
        
        window.removeEventListener("click", this.callback);
    };

    showLoginErrors(errors) {
        this.hasErrors = true;
        errors.forEach( elem => {
            let selector = document.getElementById(elem.id).nextElementSibling;
            this.appendElement({tag:"div", parentSelector:selector, text:elem.message})
				.handleClass({selector, _class:"error", action:"add"})
				.handleClass({selector, _class:"opened", action:"add"});
        });	
        
        setTimeout( () => {
            window.addEventListener("click", this.callback);
        }, 500)
    };

    toggleLoginErrors(event) {
        if(!this.hasErrors) return;
        console.log(`callback fires`);
        let { target } = event;
        if(target && target.classList.contains("initial-login__notification")) {
            target.classList.toggle("opened");
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