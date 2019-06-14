import { view as View } from "../view/View.js";
import Validator from "./validator/Validator.js";

class Controller {

    getSignInHTML = () => {
        View.getLoginSignInTemplate();
    };

    getSignUpHTML = () => {
        View.getLoginSignInTemplate();
    };

    validateUserInfo = (loginDataObj) => {
        let validator       = new Validator(),
            loginDataErrors = validator.validateField(loginDataObj);

        if (loginDataErrors.length > 0) {
            View.showLoginFormErrors(loginDataErrors);
        }
        else {
            View.setLoading();
             //IMITATE SERVER RESPONSE DELAY
            setTimeout(function(){
                View.removeLoading();
	 		    View.selectPlace();//HERE THE RECEIVED FROM A SERVER OBJECT SHOULD BE USED
            }, 1500)
        }
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

}

export const controller = new Controller();

// controller = new Controller();

// module.exports = controller;

