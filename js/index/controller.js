  function Controller() {

    this.getLoginHTML = (text) => {
        view.getLoginHTML(text);
    };

    this.getSingInHTML = (element) => {
        view.getSingInHTML(element)
    };

    this.getSingUpHTML = (element) => {
        view.getSingUpHTML(element)
    };

    this.validateUserInfo = (obj) => {
       let formInfo = model.validateUserInfo(obj);
       if(formInfo.length > 0 ) {
           return view.showFormErrors(formInfo);
       }
       view.setLoading();
       //IMITATE SERVER RESPONSE DELAY
        setTimeout(function(){
            view.removeLoading();
        }, 49000)
    };

}



