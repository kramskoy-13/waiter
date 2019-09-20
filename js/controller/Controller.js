import { view as View } from "../view/View.js";
import { model as Model } from "../model/Model.js";
import Validator from "./validator/Validator.js";

class Controller {

    /// SET UP ///

    checkIfAppAlreadyLoaded() {
        return Model.checkIfAppAlreadyLoaded()
    };

    setAppStateToLoaded() {
        Model.setAppStateToLoaded();
    }

    /// LOGIN ///

    getSignInHTML() {
        if(!Model.checkIfUserLoggedIn()) {
            return View.getLoginSignInTemplate();
        }
        this.getCurrentLocationPlaces()
    };

    getSignUpHTML() {
        if(!Model.checkIfUserLoggedIn()) {
            return View.getLoginSignUpTemplate();
        }
        this.getCurrentLocationPlaces()
    };

    submitUserForm(loginDataObj) {
        if(!Model.checkIfUserLoggedIn()) {
            return this.validateUserInfo(loginDataObj)
        }
        this.getCurrentLocationPlaces();
    };

    validateUserInfo(loginDataObj) {
        let validator       = new Validator(),
            loginDataErrors = validator.validateField(loginDataObj);

        if (loginDataErrors.length > 0) {
            return View.showLoginFormErrors(loginDataErrors);
        }
        Model.fillLoginDataFields(loginDataObj)
        this.getCurrentLocationPlaces();
    };

    /// CURRENT PLACE ///

    getCurrentLocationPlaces() {
        View.setLoading();
        Model.getCurrentLocationPlaces().then( response => {
            response = ['McDonald’s', 'KFC', 'SomeCafe', 'Place to Eat', 'Another Restaurant', 'Burger Shop', 'Beer Pab'];
            if(response.length > 1) {
                View.removeLoading();
                return View.selectPlaceToBeServed(response);
            }

            response = response[0];  // <== shoud be a real place
            this.fetchSelectedPlaceData(response)
        })
    };

    fetchSelectedPlaceData(place) {
        console.log("fetchSelectedPlaceData")
        Model.fetchSelectedPlaceData(place) /// place arg is needed for the first time and in case a user logged out
            .then(() => {
                View.removeLoading();
                //View.setSelectedPlaceData(response);
                View.getMainLayoutTemplate();
            })
            .catch(error => {
                View.showErrorNotification(error)
            })
    };

    getSelectedPlaceData() {
        let data = Model.getCurrentPlaceData();
        if (typeof data !== "object") return View.showErrorNotification("There is no data provided for the current place.");
        return data;
    };

    getCurrentCategory() {
        let category = Model.getCurrentCategory();
        if(typeof category !== "object") return View.showErrorNotification("There is no data provided for the current category.", category);
        return category;
    };

    setCurrentCategory(category) {
        Model.setCurrentCategory(category)
    };

    /// CART ///

    addItemToCart(dish, num) {
        if (!dish.id) { return View.showErrorNotification("No dish has been provided.") }
        Model.addItemToCart(dish, +num);
    };

    getShoppingCartnfo() {
        let cart = Model.getShoppingCartnfo();
        View.getShoppingCartPopup(cart);
    };

    checkDishInCart(id) {
        return Model.checkDishInCart(id);
    };

    updateCartInfo(num) {
        View.updateCartInfo(num)
    };

    /// REFRESH ///

    refreshUserData(){
        Model.refreshUserData()
    };
}

export const controller = new Controller();



