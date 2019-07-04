import Strategy from "./Strategy.js";

class PasswordStrategy extends Strategy{
    constructor() {
        super();
        this.message = 'Password has to contain at least 8 characters, one uppercase character, and one digit.';
    }
    execute(value) {
        return value.length < 8 || value.match(/\d/g) === null || value.match(/[A-ZÀ-ß]/) === null;
    }
}

export default PasswordStrategy;