import { controller as Controller } from "../controller/Controller.js";
import LoginTemplate from "./Template/LoginTemplate.js";
import PopupTemplate from "./Template/PopupTemplate.js";
import PopupSPTemplate from "./Template/PopupSPTemplate.js";
import { INSERT_TEXT } from "./Template/templates/insert/_insertText.js";
import { LOADING_TEMPLATE } from "./Template/templates/_loading.js";
import { SELECT_PLACES_TEMPLATE } from "./Template/templates/_selectPlaces.js";
import { LOGIN_TEMPLATE } from "./Template/templates/_login.js";
import { CONFIRMATION_TEMPLATE } from "./Template/templates/_confirmation.js";

class View {	
	constructor() {
		this.wrapper = document.getElementById('wrapper');
		//////////////////////////
		/// LOGIN PART STARTS ///
		////////////////////////
		this.loginSignInTemplate = new LoginTemplate({
			parent:this.wrapper,
			header:INSERT_TEXT.signInHeader,
			btn:INSERT_TEXT.signInBtnText,
			template:LOGIN_TEMPLATE
		});
		this.loginSignInTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignInTemplate.initListener("#signUp", "click", this.getLoginSignUpTemplate.bind(this));

		this.loginSignUpTemplate = new LoginTemplate({
			parent:this.wrapper,
			header:INSERT_TEXT.signUpHeader,
			btn:INSERT_TEXT.signUpBtnText,
			template:LOGIN_TEMPLATE
		});
		this.loginSignUpTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignUpTemplate.initListener("#signIn", "click", this.getLoginSignInTemplate.bind(this));
		this.loginCurrentTemplate = null;
		//////////////////////////
		/// LOGIN PART ENDS /////
		////////////////////////

		////////////////////////
		/////// POPUPS ////////
		//////////////////////
		this.loadingPopup = new PopupTemplate(this.wrapper, LOADING_TEMPLATE);
		this.currenPopup = null;
		this.selectPlacePopup = null;
		this.confirmationPopup = null;
	}

	addClassBeforeFire(selector, classToAdd) {
		let element = document.querySelectorAll(selector)
		if(element) {
			element.forEach(elem => elem.classList.add(classToAdd));
		}
    };

	getLoginSignInTemplate() {
		console.log(`getSignInTemplate function fired`);
		this.addClassBeforeFire(".initial-login__container", "scale-down");
		this.loginCurrentTemplate = this.loginSignInTemplate;
		setTimeout( () => {
			this.loginSignInTemplate.create()
		}, 500 )
    };

	getLoginSignUpTemplate() {
		console.log(`getSignUpTemplate function fired`);
		this.addClassBeforeFire(".initial-login__container", "scale-down");
		this.loginCurrentTemplate = this.loginSignUpTemplate;
		setTimeout( () => {
			this.loginSignUpTemplate.create()
		}, 500 )
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
		
		Controller.submitUserForm(dataObj)
	};
	
	showLoginFormErrors(errors) {
		console.log("showLoginFormErrors fires")
		this.loginCurrentTemplate.showLoginErrors(errors);	
	};

    setLoading() {
        this.loadingPopup.create();
    };

    removeLoading() {
        this.loadingPopup.destroy();
	};
	
	selectPlaceToBeServed(places) {
		console.log("selectPlaceToBeServed fires")
		this.currenPopup = new PopupSPTemplate(this.wrapper, SELECT_PLACES_TEMPLATE);
		this.currenPopup
		.initListener("#back", "click", this.showConfirmationMessage.bind(this, 
			INSERT_TEXT.saveDataNotification,
			this.getLoginSignUpTemplate.bind(this),
			this.selectPlaceToBeServed.bind(this, places)))
		.initListener("#select", "click", this.showMainPage.bind(this)).create().selectPlace(places);
	};

	showConfirmationMessage(message, confirm = Function.prototype, cancel = Function.prototype) {
		console.log("showConfirmationMessage fires")
		this.currenPopup = new PopupTemplate(this.wrapper, CONFIRMATION_TEMPLATE, message);
		this.currenPopup.initListener("#confirm", "click", confirm).initListener("#refuse", "click", cancel).create();
	};

	showMainPage(place) {
		console.log("showMainPage fires", place)
	};
}

export const view = new View();
