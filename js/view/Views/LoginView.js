import { LOGIN_TEMPLATE } from "../Template/templates/_login.js";
import { INSERT_TEXT } from "../Template/templates/insert/_insertText.js";
import LoginTemplate from "../Template/LoginTemplate.js";

export class LoginView {

	constructor(wrapper, parent) {
		this.wrapper = wrapper;
		this.parent = parent;
        this.loginCurrentTemplate = null;
	}

	getLoginTemplate(flag) {
		console.log("getLoginTemplate function fired");
        this.parent.addClassBeforeFire(".initial-login__container", "scale-down");
        let register = flag === "signUp";
        let selector = "#";
        	selector += register ? "signIn" : "signUp";

        this.loginCurrentTemplate = new LoginTemplate({
            wrapper: this.wrapper,
            header: register ? INSERT_TEXT.signUpHeader : INSERT_TEXT.signInHeader,
            button: register ? INSERT_TEXT.signUpBtnText : INSERT_TEXT.signInBtnText,
            template: LOGIN_TEMPLATE
        });
        setTimeout( () => {
			this.loginCurrentTemplate.create();
			this.loginCurrentTemplate.handleListener({ selector:".btn.btn-submit", listener:"click", callback:this.submitLoginForm.bind(this), action: "add" })
			this.loginCurrentTemplate.handleListener({ selector, listener:"click", callback:() => {
				this.loginCurrentTemplate.removeLoginErrors();
				this.getLoginTemplate.bind(this, selector)();
			}, action: "add" })
        }, 500)		
    };

	submitLoginForm(event) {
		console.log(`submitLoginForm function fired`);
		event.preventDefault();
		const dataObj = {},
			inputArray = document.querySelectorAll("input:not([type='submit'])");
		for(let input of inputArray) {
			dataObj[input.id] = input.value;
		};
		////REMOVE ERROR CLASS AND ERROR NOTIFICATIONS////
		this.loginCurrentTemplate.removeLoginErrors();
			
		this.parent.submitUserForm(dataObj)
	};

	showLoginFormErrors(errors) {
		console.log("showLoginFormErrors fires")
		this.loginCurrentTemplate.showLoginErrors(errors);	
	};	
			
}

