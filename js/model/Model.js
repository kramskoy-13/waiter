import { controller as Controller } from "../controller/Controller.js";

class Model {
    constructor() {
        this.userEmail = null;
        this.userPassword = null;
        this.userLoggedIn = true; // <-- should be false
        this.place = null;
    }

    checkIfUserLoggedIn() {
        console.log("checkIfUserLoggedIn fires")
        return this.userLoggedIn;
    };

    fillLoginDataFields(loginDataObj) {
        this.userLoggedIn = true;
        this.userEmail = loginDataObj.email;
        this.userPassword = loginDataObj.password;
        console.log('fillLoginDataFields fires:', this)
    };

    getCurrentLocationPlaces() {
        /// HERE A REAL REQUEST TO THE DATA BASE SHOULD BE USED///
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve("result"), 2000);
        })
    };

    refreshUserData() {
        this.userEmail = null;
        this.userPassword = null;
        this.userLoggedIn = false;
    };

    getMenu() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve("result"), 3000);
        })
    }
}

export const model = new Model();
