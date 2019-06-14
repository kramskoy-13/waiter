import Strategy from "./Strategy.js";

class EmailStrategy extends Strategy {
    constructor() {
        super();
        this.message = 'Email address is invalid.';
    }
    execute(value) {
        let emailRegexp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !value.match(emailRegexp);
    }
}

export default EmailStrategy;