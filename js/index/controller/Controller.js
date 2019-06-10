// import { View } from '../view/View';
// const View = require('../view/View');

class Controller {

    getSignInHTML = () => {
        View.getSignInTemplate();
    };

    getSignUpHTML = () => {
        View.getSignInTemplate();
    };

    validateUserInfo = (obj) => {
        console.log(obj)
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

const c = new Controller();

export default c;

// controller = new Controller();

// module.exports = controller;

