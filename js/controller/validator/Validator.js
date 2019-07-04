import PasswordStrategy from "./strategy/PasswordStrategy.js";
import EmailStrategy from "./strategy/EmailStrategy.js";

const CONFIG = {
    email    : new EmailStrategy(),
    password : new PasswordStrategy()
}

class Validator {
    constructor(strategy) {
        this.strategy = strategy;
        this.errors = [];
    }

    validateField(loginDataObj) {

        for (let field in loginDataObj) {

            let data = loginDataObj[field]

            if (loginDataObj.hasOwnProperty(field)) {

                if (!CONFIG[field]) {
                    console.log(`the strategy for ${field} has not been provided`); return;
                }
                this.strategy = CONFIG[field];
                

                //////  the execute method return bool - //////////
                //////  "true" means a field has error value /////
                if (this.strategy.execute(data)) {
                    let errorsObj     = {};
                    errorsObj.id      = field
                    errorsObj.message = this.strategy.message;

                    this.errors.push(errorsObj)
                }
 
            }

        }

        return this.errors;
    }

}

export default Validator;