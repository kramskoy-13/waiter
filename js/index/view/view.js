////////////////////////////////
// OUTER MODULES PART STARTS //
//////////////////////////////
// const Controller  = require('../controller/Controller'),
//const LoginTemplate = require('./templates/LoginTemplate');
import LoginTemplate from "./templates/LoginTemplate.js";
import { controller } from "../controller/Controller.js";
////////////////////////////////
// OUTER MODULES PART ENDS ////
//////////////////////////////

class View {	
	constructor() {
		this.wrapper         = document.getElementById('wrapper');
		this.shadowContainer = document.createElement('div');
		//////////////////////////
		/// LOGIN PART STARTS ///
		////////////////////////
		this.loginSignInTemplate = new LoginTemplate(
			this.wrapper,
			'Nice to meet you again! Please, sign in to be served.',
			'New to <span class="color-main txt-bold">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.'
		);
		this.loginSignInTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignInTemplate.initListener("#signUp", "click", this.getLoginSignUpTemplate.bind(this));

		this.loginSignUpTemplate = new LoginTemplate(
			this.wrapper,
			'Welcome to Waiter! Please, sign up in order to be served.',
			'Have Already <span class="color-main txt-bold">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.'
		);
		this.loginSignUpTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignUpTemplate.initListener("#signIn", "click", this.getLoginSignInTemplate.bind(this));
		//////////////////////////
		/// LOGIN PART ENDS /////
		////////////////////////

// 		shadowContainer.className = 'shadow-container__wrapper';
// 		shadowContainer.innerHTML = `
// 				  <h1 class="shadow-container__logo initial-login__logo logo-margin">Waiter</h1>
// 				  <div class="shadow-container__loading">
// 					  <div class="shadow-container__dots">
// 						  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
// 					  </div>
// 				  </div>  
//   `;
	}

	addClassbeforeFire(selector, classToAdd) {
		let element = document.querySelector(selector)
		if(element) {
			element.classList.add(classToAdd);
		}
    };

	getLoginSignInTemplate() {
		console.log(`getSignInTemplate function fired`);
		this.addClassbeforeFire(".initial-login__container", "scale-down");
		setTimeout( () => {
			this.loginSignInTemplate.create()
		}, 500 )
    };

	getLoginSignUpTemplate() {
		console.log(`getSignUpTemplate function fired`);
		this.addClassbeforeFire(".initial-login__container", "scale-down");
		setTimeout( () => {
			this.loginSignUpTemplate.create()
		}, 500 )
    };

	submitLoginForm(event) {
		event.preventDefault();
		console.log(`submitLoginForm function fired`);
		const dataObj = {},
			inputArray = document.querySelectorAll("input:not([type='submit'])")
		for(let input of inputArray) {
			dataObj[input.id] = input.value;
			input.nextElementSibling.classList.remove('error');
			input.nextElementSibling.innerHTML = '!';
		}
		controller.validateUserInfo(dataObj)
    };

	fillLoginDataObject(event) {
		console.log(`fillLoginDataObject function fired`);
		if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
		// userSignIn[event.target.id] = event.target.value;
    };

    showLoginFormErrors(errors) {
        errors.forEach(elem => {
            //let notification = document.createElement('div');
            //let elemToPaste = document.getElementById(elem.id).nextElementSibling;
            let selector = document.getElementById(elem.id).nextElementSibling;
            this.loginSignInTemplate.appendElement("div", selector, elem.message);
            this.loginSignInTemplate.handleClass(selector, "error", "add").handleClass(selector, "opened", "add");

            //notification.innerText = elem.message;
            //elemToPaste.classList.add('error');
            //elemToPaste.classList.add('opened');
            //let notification = document.createElement('div'),
            //    parentEl = window[elem.id].nextElementSibling;
            //notification.innerText = elem.message;
            //parentEl.classList.add('error');
            //parentEl.classList.add('opened');
            //parentEl.appendChild(notification);
        });
    };
    //////////////////////////////////////////////
    ///////// OPEN AND CLOSE ERROR TAB //////////
    ////////////////////////////////////////////


    setLoading = () => {
        wrapper.appendChild(shadowContainer);
    };

    removeLoading = () => {
        wrapper.removeChild(shadowContainer);
    };
	
	selectPlace = () => {
		
		userInputObj.email    = '';
		userInputObj.password = '';
		
		wrapper.innerHTML = `
			<h1 class="initial-login__logo">Waiter</h1>
			<div class="select-place__wrapper">
				<div class="select-place__container">
                    <div class="select-place__container_select">
                    	<p>We have found several places near you. Please, choose one in which you want to be served.
                    		<span class="button">Ok</span>
                    	</p>
						<h4 class="h4">Please, choose a place in which you want to be served.</h4>	
                        <ul class="select-place__container_list"></ul> 
                    </div>
					<button class="select-place__container_button button" id="back">Back</button>
					<button class="select-place__container_button button">Select</button>
                </div>
			</div>
		`;
		
		setTimeout(() => {
			let arr       = ['MC', 'KFC', 'Cafe', 'Place to Eat', 'Restaurant', 'Burger Shop', 'Beer Pab'], //THE REAL ARRAY SHOULD COME FROM A SERVER
				arrLength = arr.length,
				fragment  = document.createDocumentFragment(),
				ul 		  = document.querySelector('.select-place__container_list'),
				li,
				i = 0,
                liList,
				self = this;
			
			for(; i < arrLength; i++) {
				li = document.createElement('li');
				li.innerHTML = arr[i];
				li.addEventListener('click', (event) => {
                    liList = document.querySelectorAll('li');
                    liList.forEach(li => li.className = '');
                    if(!event.target.className) {
                        event.target.className = 'selected';
					}
				});
				fragment.appendChild(li);
			}

			ul.appendChild(fragment);
			
			function showList() {
				let ul = document.querySelector('.select-place__container');
					ul.classList.add('opened');
					document.removeEventListener('click', showList);
			}
			function showBackToLogin(event) {
				if(!event.target.id || event.target.id !== 'back') return;
				
				document.removeEventListener('click', showBackToLogin);
				
				document.addEventListener('click', documentListeners.loginChecker);
				document.addEventListener('click', documentListeners.loginToggler);
				document.addEventListener('submit', documentListeners.loginSubmitter);
				
				self.getLoginHTML(loginParamsObj.signUp)
			}
			document.addEventListener('click', showList);
			document.addEventListener('click', showBackToLogin);
		},0);
	};
}

export const view = new View();

// module.exports = view;