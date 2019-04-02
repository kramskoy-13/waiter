function Model () {

    const _validator =  {

        errorArray : [],
        types      : {},

        validate: function(obj) {

            this.errorArray = [];

            for(let key in obj) {
                if( obj.hasOwnProperty(key) ) {

                    let strategy = this.config[key];     // required
                    let type     = this.types[strategy]; //  {checker , message}

                    if(!type) {
                        continue
                    }
                    if(!strategy) {
                        throw {
                            name: 'Strategy Error',
                            message: 'Corresponding Strategy object has not been found.'
                        }
                    }
                    if( type.checker( obj[key] ) ) {
                        this.errorArray.push( { message : type['message'], id : key } )
                    }
                }
            }
            return this.errorArray;
        },

    };
    _validator.config = {
        name     : 'required',
        email    : 'email',
        password : 'password'
    };
    _validator.types.required = {
        checker: function(value) {
            return value === '';
        },
        message: 'This value has to be filled in.'
    };
    _validator.types.email = {
        checker: function(value) {
            let emailRegexp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !value.match(emailRegexp);
        },
        message: 'Email address is invalid.'
    };
    _validator.types.password = {
        checker: function(value) {
            return value.length < 8 || value.match(/\d/g) === null || value.match(/[A-ZА-Я]/) === null;
        },
        message: 'Password has to contain at least 8 characters, one uppercase character, and one digit.'
    };

    this.validateUserInfo = function(obj) {
        return _validator.validate(obj);
    }

}



