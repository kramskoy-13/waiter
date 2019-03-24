  function Controller() {

    this.getSingInHTML = (element) => {
        view.getSingInHTML(element)
    };

    this.getSingUpHTML = (element) => {
        view.getSingUpHTML(element)
    };

    this.validateUserInfo = (obj) => {
        model.validateUserInfo(obj);
    };

}



