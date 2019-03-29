  function Controller() {

    this.getSingInHTML = (element) => {
        view.getSingInHTML(element)
    };

    this.getSingUpHTML = (element) => {
        view.getSingUpHTML(element)
    };

    this.validateUserInfo = (obj) => {
       let formErrors = model.validateUserInfo(obj);
       if(formErrors.length > 0) {
           view.showFormErrors(formErrors)
       }
    };

}



