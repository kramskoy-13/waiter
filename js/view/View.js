import { controller as Controller } from "../controller/Controller.js";

/////////////////////////
/////// CLASSES ////////
///////////////////////

import Template from "./Template/Template.js";
import LoginTemplate from "./Template/LoginTemplate.js";
import PopupTemplate from "./Template/PopupTemplate.js";
import PopupSPTemplate from "./Template/PopupSPTemplate.js";

///////////////////////////
/////// TEMPLATES ////////
//////////////////////////

import { INSERT_TEXT } from "./Template/templates/insert/_insertText.js";
import { LOADING_TEMPLATE } from "./Template/templates/_loading.js";
import { SELECT_PLACES_TEMPLATE } from "./Template/templates/_selectPlaces.js";
import { LOGIN_TEMPLATE } from "./Template/templates/_login.js";
import { CONFIRMATION_TEMPLATE } from "./Template/templates/_confirmation.js";
import { MAIN_TEMPLATE } from "./Template/templates/_main.js";
import { NAVIGATION_TEMPLATE } from "./Template/templates/_navigation.js";
import { FOOTER_TEMPLATE } from "./Template/templates/_footer.js";
import { SHOPPING_CHART_TEMPLATE } from "./Template/templates/_shopping-cart.js";
import { CATEGORIES_TEMPLATE } from "./Template/templates/_categories.js";

///////////////////////
/////// ICONS ////////
/////////////////////

import { cocktails_alc } from "./svg/cocktails_alc.js";
import { cocktails_alc_free } from "./svg/cocktails_alc_free.js";
import { dessert } from "./svg/dessert.js";
import { first_course } from "./svg/first_course.js";
import { fish } from "./svg/fish.js";
import { meat } from "./svg/meat.js";
import { salads } from "./svg/salads.js";

class View {	
	constructor() {
        this.wrapper = document.getElementById('wrapper');

        this.loginCurrentTemplate = null;

        this.selectedPlace = null;
        this.selectedPlaceData = null;

		////////////////////////
		/////// POPUPS ////////
		//////////////////////
        this.loadingPopup = new PopupTemplate({ parent: this.wrapper, template:LOADING_TEMPLATE });
        this.currenPopup = null;

        //////////////////////////////
		/////// MAIN PARTS //////////
		////////////////////////////
        this.mainLayoutTemplate = null; // <== consists of navigation bar, footer and placeholder for main content
        ///  NAVIGATION  ////
        this.navigationTemplate = new Template({ parent: "nav", template: NAVIGATION_TEMPLATE });
        ///  FOOTER  ////
        this.footerTemplate = new Template({ parent: "footer", template: FOOTER_TEMPLATE });    // <-- footer id set into main template
        this.shoppingChart = new Template({ parent: "shopping-cart", template: SHOPPING_CHART_TEMPLATE });

        this.currentMainTemplate = null;
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

        this.loginCurrentTemplate = new LoginTemplate({
            parent: this.wrapper,
            header: INSERT_TEXT.signInHeader,
            button: INSERT_TEXT.signInBtnText,
            template: LOGIN_TEMPLATE
        });
        this.loginCurrentTemplate.initListener({ selector: ".btn.btn-submit", listener: "click", callback: this.submitLoginForm.bind(this) });
        this.loginCurrentTemplate.initListener({ selector: "#signUp", listener: "click", callback: this.getLoginSignUpTemplate.bind(this) });

		setTimeout( () => {
			this.loginCurrentTemplate.create()
        }, 500)
    };

	getLoginSignUpTemplate() {
		console.log(`getSignUpTemplate function fired`);
        this.addClassBeforeFire(".initial-login__container", "scale-down");

        this.loginCurrentTemplate = new LoginTemplate({
            parent: this.wrapper,
            header: INSERT_TEXT.signUpHeader,
            button: INSERT_TEXT.signUpBtnText,
            template: LOGIN_TEMPLATE
        });
        this.loginCurrentTemplate.initListener({ selector: ".btn.btn-submit", listener: "click", callback: this.submitLoginForm.bind(this) });
        this.loginCurrentTemplate.initListener({ selector: "#signIn", listener: "click", callback: this.getLoginSignInTemplate.bind(this) });

		setTimeout( () => {
			this.loginCurrentTemplate.create()
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
        console.log("selectPlaceToBeServed fires");
        this.selectedPlace = places[0]; // <-- corresponding the first element is set at PopupSPTemplate
        this.currenPopup = new PopupSPTemplate({ parent: this.wrapper, template:SELECT_PLACES_TEMPLATE, flag });
		this.currenPopup
            .initListener({selector: "#select", listener: "click", callback: this.getSelectedPlaceData.bind(this)})
            .initListener({
                selector: "#back", listener: "click", callback: this.showConfirmationMessage.bind(this,
                    {
                        message: INSERT_TEXT.saveDataNotification,
                        confirm: () => {
                            this.refreshUserData.bind(this)();
                            this.getLoginSignInTemplate.bind(this)();
                            this.currenPopup.destroy();
                        },
                        cancel: this.selectPlaceToBeServed.bind(this, places, true)
                    })
            })
            .create()
            .showList(places)
            .handleListener({ selector: ".popup__container_list > li", listener: "click", callback: this.selectPlace.bind(this), action: "add" })
	};

    selectPlace() {
        console.log("View selectPlace")
        if (!event.target || !event.target.id) {
            return this.showErrorNotification()
        }
        this.selectedPlace = event.target.id;
    };

    getSelectedPlaceData() {
        console.log("getCategoriesData");
        this.setLoading();
        this.currentMainTemplate = this.getCategoriesTemplate;
        Controller.getSelectedPlaceData(this.selectedPlace);
    };

    setSelectedPlaceData(data) {
        console.log("setSelectedPlaceData");
        this.selectedPlaceData = data;
    };

	showConfirmationMessage({message, confirm = Function.prototype, cancel = Function.prototype}) {
		console.log("showConfirmationMessage")
        this.currenPopup = new PopupTemplate({ parent: this.wrapper, template:CONFIRMATION_TEMPLATE, message });
		this.currenPopup.initListener({selector:"#confirm", listener:"click", callback:confirm}).initListener({selector:"#refuse",listener:"click", callback:cancel}).create();
	};

    getMainLayoutTemplate() {
        console.log("getMainLayout");
        this.mainLayoutTemplate = new Template({ parent: this.wrapper, template: MAIN_TEMPLATE });
        this.mainLayoutTemplate.create();
        this.mainLayoutTemplate
            .addChild(this.getNavigationTemplate.bind(this))
            .addChild(this.getFooterTemplate.bind(this))
            .addChild(this.getCurrentMainTemplate.bind(this))
            .createChildren()
    };

    getCurrentMainTemplate() {
        console.log("getCurrentMainTemplate");
        if (typeof this.currentMainTemplate === "function") { this.currentMainTemplate() }
        else { console.error(this.currentMainTemplate, "is not a function") }
    };

    getNavigationTemplate() {
        console.log("getNavigationTemplate");
        this.navigationTemplate.initListener({ selector: "#nav", listener: "click", callback: this.toggleMenuPopup.bind(this) })
        this.navigationTemplate.create()
    };

    getFooterTemplate() {
        console.log("getFooterTemplate");
        this.footerTemplate.create();
        this.footerTemplate
            .addChild(this.getShoppingChartTemplate.bind(this))
            .createChildren()
    };

    getShoppingChartTemplate() {
        console.log("getShoppingChartTemplate");
        this.shoppingChart.initListener({ selector: "#shopping-cart", listener: "click", callback: this.getShoppingChartInfo.bind(this) })
        this.shoppingChart.create()
    };

    getCategoriesTemplate() {
        console.log("getCategoriesTemplate");
        const config = {
            0: salads,
            1: cocktails_alc,
            2: cocktails_alc_free,
            3: dessert,
            4: first_course,
            5: fish,
            6: meat
        }
        const categories = this.selectedPlaceData.map(item => {
            return {
                name: item.name,
                icon: config[item.category]
            }
        })
        this.currentMainTemplate = new Template({ parent: "main", template: CATEGORIES_TEMPLATE });
        this.currentMainTemplate.create({ categories })
    };

    toggleMenuPopup() {
        console.log("toggleMenuPopup")
    };

    getShoppingChartInfo() {
        console.log("getShoppingChartInfo")
    };

	refreshUserData() {
		Controller.refreshUserData()
    };

    showErrorNotification(error) {
        console.log(error)
        debugger
    };
}

export const view = new View();
