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
		this.loginSignInTemplate.initListener({selector:".btn.btn-submit", listener:"click", callback:this.submitLoginForm.bind(this)});
		this.loginSignInTemplate.initListener({selector:"#signUp", listener:"click", callback:this.getLoginSignUpTemplate.bind(this)});

		this.loginSignUpTemplate = new LoginTemplate({
			parent:this.wrapper,
			header:INSERT_TEXT.signUpHeader,
			btn:INSERT_TEXT.signUpBtnText,
			template:LOGIN_TEMPLATE
		});
		this.loginSignUpTemplate.initListener({selector:".btn.btn-submit", listener:"click", callback:this.submitLoginForm.bind(this)});
		this.loginSignUpTemplate.initListener({selector:"#signIn", listener:"click", callback:this.getLoginSignInTemplate.bind(this)});
		this.loginCurrentTemplate = null;
		//////////////////////////
		/// LOGIN PART ENDS /////
		////////////////////////

		////////////////////////
		/////// POPUPS ////////
		//////////////////////
		this.loadingPopup = new PopupTemplate(this.wrapper, LOADING_TEMPLATE);
		this.currenPopup = null;

		this.selectedPlace = null;
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
			this.loginCurrentTemplate.create()
		}, 500 )
    };

	getLoginSignUpTemplate() {
		console.log(`getSignUpTemplate function fired`);
		this.addClassBeforeFire(".initial-login__container", "scale-down");
		this.loginCurrentTemplate = this.loginSignUpTemplate;
		setTimeout( () => {
			this.loginCurrentTemplate.create()
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
	
	selectPlaceToBeServed(places, flag) {
		console.log("selectPlaceToBeServed fires")
		this.currenPopup = new PopupSPTemplate(this.wrapper, SELECT_PLACES_TEMPLATE, flag);
		this.currenPopup
		.initListener({selector:"#select", listener:"click", callback:this.getMenuTemplate.bind(this)})
		.initListener({selector:"#back", listener:"click", callback:this.showConfirmationMessage.bind(this, 
			{
				message:INSERT_TEXT.saveDataNotification,
				confirm:() => {
					this.refreshUserData.bind(this)();
					this.getLoginSignInTemplate.bind(this)();
					this.currenPopup.destroy();
				},
				cancel:this.selectPlaceToBeServed.bind(this, places, true)
			})
		})
		.create()
		.showList(places)
		.handleListener({selector:".popup__container_list > li", listener: "click", callback: this.selectPlace.bind(this), action: "add"})
	};

	showConfirmationMessage({message, confirm = Function.prototype, cancel = Function.prototype}) {
		console.log("showConfirmationMessage")
		this.currenPopup = new PopupTemplate(this.wrapper, CONFIRMATION_TEMPLATE, message);
		this.currenPopup.initListener({selector:"#confirm", listener:"click", callback:confirm}).initListener({selector:"#refuse",listener:"click", callback:cancel}).create();
	};

	selectPlace() {
		console.log("selectPlace")
		if(!event.target || !event.target.id) {
			return this.showErrorNotification.bind(this)()
		} 
		this.selectedPlace = event.target.id;
	};

	showErrorNotification() {
		console.error("There is an error occured.")
	}

	getMenuTemplate(place) {
		console.log("getMenuTemplate");

	};

	refreshUserData() {
		Controller.refreshUserData()
	};
}

export const view = new View();
