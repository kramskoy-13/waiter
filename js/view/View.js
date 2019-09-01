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
import { DISHES_TEMPLATE } from "./Template/templates/_dishes.js";
import { SELECTED_DISH_TEMPLATE } from "./Template/templates/_selectedDish.js";
import { CURRENT_PURCHASE_TEMPLATE } from "./Template/templates/_current-purchase.js";

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
		////////////////////////
		/////// POPUPS ////////
		//////////////////////
        this.loadingPopup = new PopupTemplate({ parent: this.wrapper, template:LOADING_TEMPLATE });
        this.currentPopup = null;
        //////////////////////////////
		/////// MAIN PARTS //////////
		////////////////////////////
        this.mainLayoutTemplate = null; // <== consists of navigation bar, footer and placeholder for main content
        this.navigationTemplate = null;// <-- navigation id set into main template 
        this.footerTemplate = null; // <-- footer id set into main template 
        
        this.highlightedSpanNum = "two"; // two dishes are shown in row
        this.shoppingCart = new Template({ parent: "cartHolder", template: SHOPPING_CHART_TEMPLATE });
        /////// CURRENT TEMPLATE //////////
        this.currentMainTemplate = null;
        this.currentMainTemplateMark = null;
	}

    setLoading() {
        this.loadingPopup.create();
    };

    removeLoading() {
        this.loadingPopup.destroy();
    };

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

	selectPlaceToBeServed(places, flag) {
        console.log("selectPlaceToBeServed fires");
        //this.selectedPlace = places[0]; // <-- corresponding the first element is set at PopupSPTemplate
        this.currentPopup = new PopupSPTemplate({ parent: this.wrapper, template:SELECT_PLACES_TEMPLATE, flag });
		this.currentPopup
            .initListener({
                selector: "#select", listener: "click", callback: () => {
                    let selectedLI = document.querySelector(".selected");
                    if (!selectedLI || !selectedLI.id) return this.showErrorNotification();
                    this.fetchSelectedPlaceData.bind(this, selectedLI.id)();
                }
            })
            .initListener({
                selector: "#back", listener: "click", callback: this.showConfirmationMessage.bind(this,
                    {
                        message: INSERT_TEXT.saveDataNotification,
                        confirm: () => {
                            this.refreshUserData.bind(this)();
                            this.getLoginSignInTemplate.bind(this)();
                            this.currentPopup.destroy();
                        },
                        cancel: this.selectPlaceToBeServed.bind(this, places, true)
                    })
            })
            .create()
            .showList(places)
            //.handleListener({ selector: ".popup__container_list > li", listener: "click", callback: this.selectPlace.bind(this), action: "add" })
	};

    fetchSelectedPlaceData(place) {
        console.log("fetchSelectedPlaceData");
        this.setLoading();
        this.currentMainTemplate = this.getCategoriesTemplate;
        //Controller.getSelectedPlaceData(place);
        Controller.fetchSelectedPlaceData(place);
    };

    getSelectedPlaceData() {
        return Controller.getSelectedPlaceData() /// { data: placeData, place: place }
    };

    getCurrentCategory() {
        return Controller.getCurrentCategory()
    };

	showConfirmationMessage({message, confirm = Function.prototype, cancel = Function.prototype}) {
		console.log("showConfirmationMessage")
        this.currentPopup = new PopupTemplate({ parent: this.wrapper, template:CONFIRMATION_TEMPLATE, message });
        this.currentPopup
            .initListener({ selector: "#confirm", listener: "click", callback: confirm }).initListener({ selector: "#refuse", listener: "click", callback: cancel })
            .create();
	};

    getMainLayoutTemplate() {
        console.log("getMainLayout");
        this.mainLayoutTemplate = new Template({ parent: this.wrapper, template: MAIN_TEMPLATE });
        this.shoppingCart.initListener({ selector: ".footer__display", listener: "click", callback: this.changeNumberOfItemsToShow.bind(this) })
        this.mainLayoutTemplate.create();
        this.mainLayoutTemplate
            .addChild(this.getNavigationTemplate.bind(this))
            .addChild(this.getFooterTemplate.bind(this))
            .addChild(this.getCurrentMainTemplate.bind(this))
            .createChildren()
    };

    getCurrentMainTemplate() {
        console.log("getCurrentMainTemplate");
        if (typeof this.currentMainTemplate !== "function") {
            console.error(this.currentMainTemplate, "currentMainTemplate should be a function");
            return
        }
        this.currentMainTemplate()
    };

    getNavigationTemplate() {
        console.log("getNavigationTemplate");
        this.navigationTemplate = new Template({ parent: "nav", template: NAVIGATION_TEMPLATE });
        this.navigationTemplate.initListener({ selector: "#nav", listener: "click", callback: this.toggleMenuPopup.bind(this) })
        this.navigationTemplate.create()
    };

    getFooterTemplate() {
        console.log("getFooterTemplate");
        this.footerTemplate = new Template({ parent: "footer", template: FOOTER_TEMPLATE });  
        this.footerTemplate.create();
        this.footerTemplate
            .addChild(this.getShoppingCartTemplate.bind(this))
            .createChildren()
    };

    getShoppingCartTemplate() {
        console.log("getShoppingCartTemplate");
        this.shoppingCart.initListener({ selector: ".shopping-cart", listener: "click", callback: this.getShoppingCartnfo.bind(this) })
        this.shoppingCart.create(0); /// <- 0 means number of dishes to show, initially the cart is empty
    };

    getCategoriesTemplate() {
        console.log("getCategoriesTemplate");
        this.currentMainTemplateMark = "categories";
        const config = {
            0: salads,
            1: cocktails_alc,
            2: cocktails_alc_free,
            3: dessert,
            4: first_course,
            5: fish,
            6: meat
        }
        let categories = this.getSelectedPlaceData();
        if (!categories || !categories.data) return showErrorNotification("No categories data has been provided");
            categories = categories.data.map(item => {
                return {
                    name: item.name,
                    icon: config[item.category],
                    id: item.id
                }
            });
        const selector = ".main__container_item";

        this.currentMainTemplate = new Template({ parent: "main", template: CATEGORIES_TEMPLATE });
        this.currentMainTemplate
            .initListener({ selector, listener: "click", callback: this.selectItem.bind(this, selector) })
            .initListener({
                selector: ".select", listener: "click", callback: event => {
                    let target = event.target.className == "main__container_item aim" ? event.target.id : event.target.closest(".main__container_item.aim").id;
                    this.getSelectedPlaceData().data.forEach(c => {
                        if (c.id && c.id == target) return Controller.setCurrentCategory(c);
                    })
                    let category = this.getCurrentCategory();
                    if (category && category.dishes) {
                        this.getDishesTemplate(category.name, category.dishes)
                    }
                }
            })
            .create({ categories });
        /// REMOVE HIGHLIGHTED SPAN FROM FOOTER ///
        this.removeSelectedClass();
    };

    selectItem(selector) {
        console.log("selectItem fires")
        let items = document.querySelectorAll(selector);
            items.forEach(e => e.classList.remove("aim"));

        let target = event.target.closest(selector);
        target.scrollIntoView({ block: "center", behavior: "smooth" })
        target.classList.add("aim");
    };

    getDishesTemplate(name, dishes) {
        const selector = ".main__container_item";

        this.currentMainTemplateMark = "dishes"; // to highlight

        this.currentMainTemplate = new Template({ parent: "main", template: DISHES_TEMPLATE });
        this.currentMainTemplate
            .initListener({ selector: "#categories", listener: "click", callback: this.getCategoriesTemplate.bind(this) }) 
            .initListener({ selector, listener: "click", callback: this.selectItem.bind(this, selector) }) // show select item
            .initListener({ selector: ".select", listener: "click", callback: this.handleSelectedDish.bind(this)  }) // handle selected item
            .initListener({ selector: ".footer__display_row", listener: "click", callback: this.changeNumberOfItemsToShow.bind(this) })
            .create({ name, dishes });
        this.currentMainTemplate
            .handleClass({ selector: `#${this.highlightedSpanNum}`, _class: "selected", action: "add" })
            .handleClass({ selector: ".main__container", _class: this.highlightedSpanNum, action: "add" })

        document.querySelector(".navigation__sub-menu").scrollIntoView({ block: "center", behavior: "smooth" })
    };

    // USER SELECT AN ITEM //
    handleSelectedDish(e) {
        let target = e;
        if (typeof e !== "string") {
            target = e.target.closest(".aim");
            if (!target || !target.id) return;
            target = target.id
        }
        
        /// REMOVE HIGHLIGHTED SPAN FROM FOOTER ///
        this.currentMainTemplateMark = "dish";
        this.removeSelectedClass();

        let category = this.getCurrentCategory();

        let dish = category.dishes.filter(d => d.id === target)[0];

        let alreadyInCart = Controller.checkDishInCart(dish.id);
        let cartCallback = alreadyInCart ? this.getShoppingCartnfo.bind(this) : this.getCurrentPurchasePopup.bind(this, dish, target);

        /// check if the dish is already at the cart
        /// if yes, show link to the cart instead
        /// showing of 'add to chart' button

        this.currentMainTemplate = new Template({ parent: "main", template: SELECTED_DISH_TEMPLATE });
        this.currentMainTemplate
            .initListener({
                selector: ".sub-pointer", listener: "click", callback: event => {
                    let { target } = event;
                    let closest = target.closest(".sub-menu")
                    if (closest) { closest.classList.toggle("open") }
                }
            }) 
            .initListener({ selector: "#categories", listener: "click", callback: this.getCategoriesTemplate.bind(this) }) 
            .initListener({ selector: "#dishes", listener: "click", callback: this.getDishesTemplate.bind(this, category.name, category.dishes) }) 
            .initListener({ selector: "#cart", listener: "click", callback: cartCallback }) 
            .create({ dish, flag : alreadyInCart }) /// <-- create new if statement at template
    };

    getCurrentPurchasePopup(dish, id) {
        let category = this.getCurrentCategory();

        this.currentPopup = new PopupTemplate({ parent: this.wrapper, template: CURRENT_PURCHASE_TEMPLATE });
        this.currentPopup
            .initListener({
                selector: "#close", listener: "click", callback: () => {
                    this.currentPopup.destroy.bind(this.currentPopup)();
                    this.handleSelectedDish.bind(this, id)();
                } 
            })
            .initListener({
                selector: "#categories", listener: "click", callback: () => {
                    this.currentPopup.destroy.bind(this.currentPopup)();
                    this.getCategoriesTemplate.bind(this)();
                }
            })
            .initListener({
                selector: "#dishes", listener: "click", callback: () => {
                    this.currentPopup.destroy.bind(this.currentPopup)();
                    this.getDishesTemplate.bind(this, category.name, category.dishes)();
                }
            })
            .create(dish);
        let sumUAH = document.getElementById("sum");
        let cartInput = document.getElementById("cart-input");
        this.currentPopup
            .handleListener({ selector: ".popup__panel_button", listener: "click", callback: this.handleNumbClick.bind(this, cartInput, sumUAH, dish), action: "add" })
            .handleListener({ selector: "#cart-input", listener: "input", callback: this.handleNumbInput.bind(this, cartInput, sumUAH, dish), action: "add" });
        this.addItemToCart(dish, cartInput);
    };

    handleNumbClick(cartInput, sumUAH, dish) {
        if (!event.target || !event.target.id) return;
        switch (event.target.id) {
            case "add": {
                if (+cartInput.value === 40) return;
                ++cartInput.value;
                break
            } 
            case "subtract": {
                if (+cartInput.value === 1) return;
                --cartInput.value;
                break
            }
            default: return
        }
        sumUAH.innerHTML = (cartInput.value * dish.price).toFixed(2);
        this.addItemToCart.bind(this, dish, cartInput)();
    };

    handleNumbInput(cartInput, sumUAH, dish) {
        let reg = /\D+/g;
        let e = event.target;
            e.value = e.value.replace(reg, "");
        if (+e.value > 40) { e.value = 40 }
        if (+e.value <= 0) { e.value = 1 }
        sumUAH.innerHTML = (e.value * dish.price).toFixed(2);
        this.addItemToCart.bind(this, dish, cartInput)();
    };

    /// CART START ///

    getShoppingCartnfo() {
        console.log("getShoppingCartnfo")
    };

    addItemToCart(dish, cartInput) {
        if (cartInput && dish) Controller.addItemToCart(dish, cartInput.value); 
    };

    showFilledCart(num) {
        let cart = document.getElementById("shopping-cart");
            cart.classList.add("filled");
        let cartCount = document.getElementById("cartCount");
        if(!cartCount) {
            cartCount = new Template({ parent: cart, template: () => { return `<span class="footer__count" id="cartCount">${num}</span>` } });
            cartCount.create();
        }
        cartCount.innerHTML = num
    };

    showEmptyCart() {
        let cart = document.getElementById("shopping-cart");
            cart.classList.remove("filled");
    };

    /// CART END ///
    changeNumberOfItemsToShow() {
        if ( !event.target ||  this.currentMainTemplateMark !== "dishes" ) { return }
        let target = event.target.closest(".footer__display_row");
        if (!target || !target.id) { return }

        this.removeSelectedClass();

        target.classList.add("selected");

        this.highlightedSpanNum = target.id;
        let container = document.querySelector(".main__container");
            container.className = "main__container dishes"; // <-- refresh container from previous styles
            container.classList.add(this.highlightedSpanNum);
    }

    removeSelectedClass() {
        // METHOD AIMED TO DELETE HIGHLIGHTED SPAN FROM FOOTER
        let notTargets = document.querySelectorAll(".footer__display_row")
            notTargets.forEach(t => t.classList.remove("selected"));
    };

    toggleMenuPopup() {
        console.log("toggleMenuPopup")
    };

	refreshUserData() {
		Controller.refreshUserData()
    };

    showErrorNotification(error) {
        debugger
        console.log(error.stack)
    };
}

export const view = new View();
