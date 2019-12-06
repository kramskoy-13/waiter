import { controller as Controller } from "../controller/Controller.js";

/////////////////////////
/////// CLASSES ////////
///////////////////////

import Template from "./Template/Template.js";
import PopupTemplate from "./Template/PopupTemplate.js";

///////////////////////////
/////// TEMPLATES ////////
//////////////////////////

import { LOADING_TEMPLATE } from "./Template/templates/_loading.js";
import { CONFIRMATION_TEMPLATE } from "./Template/templates/_confirmation.js";
import { MAIN_TEMPLATE } from "./Template/templates/_main.js";
import { NAVIGATION_TEMPLATE } from "./Template/templates/_navigation.js";
import { FOOTER_TEMPLATE } from "./Template/templates/_footer.js";

/////////////////////////
/////// VIEWS //////////
///////////////////////

import { LoginView } from "./Views/LoginView.js";
import { SelectPlaceView } from "./Views/SelectPlaceView.js";
import { CategoriesView } from "./Views/CategoriesView.js";
import { DishesView } from "./Views/DishesView.js";
import { CurrentPurchase } from "./Views/CurrentPurchase.js"; 
import { CartView } from "./Views/CartView.js"; 
import { SearchView } from "./Views/SearchView.js"; 

class View {	
	constructor() {
        this.wrapper = document.getElementById('wrapper');
        this.currentPopup = null;
        /////// VIEWS /////////
        this.LoginView = new LoginView(this.wrapper, this);
        this.SelectPlaceView = new SelectPlaceView(this.wrapper, this);
        this.CategoriesView = new CategoriesView("main", this);
        this.DishesView = new DishesView("main", this);
		this.CurrentPurchase = new CurrentPurchase(this.wrapper, this);
        this.CartView = new CartView("cartHolder", this);
        this.SearchView = new SearchView("searchHolder", this);
		/////// MAIN PARTS //////////
        this.mainLayoutTemplate = null; // <-- consists of navigation bar, footer and placeholder for main content
        this.navigationTemplate = null;// <-- navigation id set into main template 
        this.footerTemplate = null; // <-- footer id set into main template 
        this.shoppingCartTemplate = null;
        this.searchTemplate = null;
        this.highlightedSpanNum = "two"; // <-- two dishes are shown in row
        /////// CURRENT TEMPLATE //////////
        this.currentMainTemplate = null;
        this.currentMainTemplateMark = null;
	}

    setLoading() {
        this.currentPopup = new PopupTemplate({ wrapper: this.wrapper, template:LOADING_TEMPLATE });
        this.currentPopup.create();
    };

    removeLoading() {
        this.currentPopup.destroy();
    };

	addClassBeforeFire(selector, classToAdd) {
		let element = document.querySelectorAll(selector)
		if(element) {
			element.forEach(elem => elem.classList.add(classToAdd));
		}
    };

    getLoginSignInTemplate() {
        this.addClassBeforeFire(".initial-login__container", "scale-down");
        this.LoginView.getLoginTemplate("signIn")
    };

    getLoginSignUpTemplate() {
        this.addClassBeforeFire(".initial-login__container", "scale-down");
        this.LoginView.getLoginTemplate("signUp")
    };

    submitUserForm(dataObj) {
        Controller.submitUserForm(dataObj)
    };
	
	showLoginFormErrors(errors) {
		console.log("showLoginFormErrors fires")
		this.LoginView.loginCurrentTemplate.showLoginErrors(errors);
	};

    selectPlaceToBeServed(places, flag) {
        this.SelectPlaceView.selectPlaceToBeServed(places, flag);
    };

    fetchSelectedPlaceData(place) {
        console.log("fetchSelectedPlaceData");
        this.setLoading();
        this.currentMainTemplate = this.getCategoriesTemplate;
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
        this.currentPopup = new PopupTemplate({ wrapper: this.wrapper, template:CONFIRMATION_TEMPLATE, message });
        this.currentPopup
            .initListener({ selector: "#confirm", listener: "click", callback: confirm }).initListener({ selector: "#refuse", listener: "click", callback: cancel })
            .create();
	};

    getMainLayoutTemplate() {
        console.log("getMainLayout");
        this.mainLayoutTemplate = new Template({ wrapper: this.wrapper, template: MAIN_TEMPLATE });
        this.mainLayoutTemplate.create();
        this.mainLayoutTemplate
            .addChild(this.getNavigationTemplate.bind(this))
            .addChild(this.getCurrentMainTemplate.bind(this))
            .addChild(this.getFooterTemplate.bind(this))
            .createChildren()
    };

    getCurrentMainTemplate() {
        if (typeof this.currentMainTemplate !== "function") return console.error(this.currentMainTemplate, "currentMainTemplate should be a function");
        this.currentMainTemplate();
    };

    getNavigationTemplate() {
        this.navigationTemplate = new Template({ wrapper: "nav", template: NAVIGATION_TEMPLATE });
        this.navigationTemplate.initListener({ selector: "#nav", listener: "click", callback: this.toggleMenuPopup.bind(this) })
        this.navigationTemplate.create()
    };

    getFooterTemplate() {
        this.footerTemplate = new Template({ wrapper: "footer", template: FOOTER_TEMPLATE });  
        this.footerTemplate.create();
        this.footerTemplate
            .addChild(this.getShoppingCartTemplate.bind(this))
            .addChild(this.getSearchTemplate.bind(this))
            .createChildren()
    };

    getCategoriesTemplate() {
        this.currentMainTemplateMark = "categories";
        this.CategoriesView.getCategoriesTemplate();
    };

    getShoppingCartTemplate() {
        this.CartView.getShoppingCartTemplate();      
    };

    getSearchTemplate() {
        this.SearchView.getSearchTemplate();
    };

    getDishesTemplate(name, dishes) {
        this.currentMainTemplateMark = "dishes"; // to highlight
        this.DishesView.getDishesTemplate(name, dishes);
    };

    fetchMoreDishes(allDishesListShown) {
        Controller.fetchMoreDishes(allDishesListShown);
    };

    showMoreDishes(newDishes) {
        this.DishesView.showMoreDishes(newDishes);
    };

   setCurrentCategory(category) {
        Controller.setCurrentCategory(category)
   };

   handleSelectedDish(id) {
        this.DishesView.handleSelectedDish(id)
   };

    getCurrentPurchasePopup(dish, id) {
        this.CurrentPurchase.getCurrentPurchasePopup(dish, id);
    };

    selectItem(selector) {
        console.log("selectItem fires")
        let items = document.querySelectorAll(selector);
            items.forEach(e => e.classList.remove("aim"));

        let target = event.target.closest(selector);
            target.scrollIntoView({ block: "center", behavior: "smooth" })
            target.classList.add("aim");
    };

    /// CART START ///

    checkDishInCart(id) {
        return Controller.checkDishInCart(id)
    };

    getShoppingCartnfo() {
        return Controller.getShoppingCartnfo();
    };

    getShoppingCartPopup() {
        this.CartView.getShoppingCartPopup();
    };

    addItemToCart(dish, cartInput) {
        if (cartInput && dish) Controller.addItemToCart(dish, cartInput.value); 
    };

    deleteItemFromCart(id) {
        Controller.deleteItemFromCart(id)
    };

    updateCartInfo(cart) {
        this.CartView.updateCartInfo(cart)
    };

    removeSelectedClass() {
        // METHOD AIMED TO DELETE HIGHLIGHTED SPAN FROM FOOTER
        let notTargets = document.querySelectorAll(".footer__display_row")
            notTargets.forEach(t => t.classList.remove("selected"));
    };

    getSortedDishes(sortedDishes) {
        return Controller.getSortedDishes(sortedDishes)
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
