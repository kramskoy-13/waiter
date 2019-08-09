import { view as View } from "../view/View.js";
import { model as Model } from "../model/Model.js";
import Validator from "./validator/Validator.js";

class Controller {

    getSignInHTML() {
        if(!Model.checkIfUserLoggedIn()) {
            View.getLoginSignInTemplate();
        }
        else {
            this.getCurrentLocationPlaces()
        }
    };

    getSignUpHTML() {
        View.getLoginSignInTemplate();
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

    getCurrentLocationPlaces(){
        View.setLoading();
        Model.getCurrentLocationPlaces().then( response => {
            response = ['McDonald’s', 'KFC', 'SomeCafe', 'Place to Eat', 'Another Restaurant', 'Burger Shop', 'Beer Pab'];
            if(response.length > 1) {
                View.removeLoading();
                return View.selectPlaceToBeServed(response);
            }

            response = response[0];  // <== shoud be a real place
            this.getSelectedPlaceData(response)
        })
    };

    getSelectedPlaceData(place) {
        console.log("getSelectedPlaceData")
        Model.getSelectedPlaceData(place)
        .then(response => {
            View.removeLoading();
            View.setSelectedPlaceData(response);
            View.getMainLayoutTemplate();
            })
            .catch(error => {
                View.showErrorNotification(error)
            })
    };

    refreshUserData(){
        Model.refreshUserData()
    };
}

export const controller = new Controller();



