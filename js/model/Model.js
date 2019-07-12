import { controller as Controller } from "../controller/Controller.js";

class Model {
    constructor() {
        this.userEmail = null;
        this.userPassword = null;
        this.userLoggedIn = true; // <-- should be false
        this.place = null;
        this.placeData = null;
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

    getSelectedPlaceData(place) {
        if (this.place == place && this.placeData) {
            return this.placeData
        }
        return new Promise((resolve, reject) => {
            this.place = place; // <-- should be reall id
            this.placeData = menu; // <-- should be reall data
            setTimeout(() => resolve( this.placeData ), 3000);
        })
    };

}

const menu = [
        {
            "name": "cocktails (alc)",
            "category": 1,
            "dishes": []
        },
        {
            "name": "cocktails (alc free)",
            "category": 2,
            "dishes": []
        },
        {
            "name": "desserts",
            "category": 3,
            "dishes": []
        },
        {
            "name": "first courses",
            "category": 4,
            "dishes": []
        },
        {
            "name": "fish dishes",
            "category": 5,
            "dishes": []
        },
        {
            "name": "meat dishes",
            "category": 6,
            "dishes": []
        },
        {
            "name": "salads",
            "category": 0,
            "dishes": []
        }
    ];

export const model = new Model();
