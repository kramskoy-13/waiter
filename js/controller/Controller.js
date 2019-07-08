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
        this.getCurrentLocationPlaces()
    //    let formInfo = model.validateUserInfo(obj);
    //    if(formInfo.length > 0 ) { return view.showFormErrors(formInfo) }

    //    view.setLoading();

    //    view.removeDocumentEvListener('click', ['toggleErrorTab', 'toggleLoginMarkup']);
    //    //IMITATE SERVER RESPONSE DELAY
    //     setTimeout(function(){
    //         view.removeLoading();
	// 		view.selectPlace();//HERE THE RECEIVED FROM A SERVER OBJECT SHOULD BE USED
    //     }, 1500)
    };

    getCurrentLocationPlaces(){
        View.setLoading();
        Model.getCurrentLocationPlaces().then( response => {
            response = ['McDonald’s', 'KFC', 'SomeCafe', 'Place to Eat', 'Another Restaurant', 'Burger Shop', 'Beer Pab'];
            if(response.length > 1) {
                View.removeLoading();
                return View.selectPlaceToBeServed(response);
            }

            response = 'SomeCafe';  // <-- shoud be a real place
            this.getMenu(response)
        })
    };

    getMenu(response) {
        Model.getMenu(response).then( response => {
            View.removeLoading();
            response = 'SomeCafe';  // <-- shoud be a real place
            View.getMenuTemplate(response);
        })
    };

    refreshUserData(){
        Model.refreshUserData()
    };
}

export const controller = new Controller();



