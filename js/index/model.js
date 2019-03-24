function Model () {

    const _validatorConfig = {
        name     : 'required',
        email    : 'email',
        password : 'password'
    };

    const _validator =  {

        

        validate: (obj) => {

        }

    };

    this.validateUserInfo = function(obj) {
        _validator.validate(obj);
    }

}



