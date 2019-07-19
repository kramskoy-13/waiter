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
        name: "cocktails (alc)",
        id: "cocktails_alc",
        category: 1,
        dishes: [
            {
                name: "coctail 1",
                price: 5,
                id: "coctail_1"
            },
            {
                name: "coctail 2",
                price: 6,
                id: "coctail_2"
            },
            {
                name: "coctail 3",
                price: 2,
                id: "coctail_3"
            },
            {
                name: "coctail 4",
                price: 1,
                id: "coctail_4"
            },
            {
                name: "coctail 5",
                price: 5.5,
                id: "coctail_5"
            },
            {
                name: "coctail 6",
                price: 6.2,
                id: "coctail_6"
            },
        ]
        },
        {
            name: "cocktails (non alc)",
            id: "cocktails_non_alc",
            category: 2,
            dishes: [
                {
                    name: "coctail (non alc) 1",
                    price: 5,
                    id: "coctail_non_alc_1"
                },
                {
                    name: "coctail (non alc) 2",
                    price: 6,
                    id: "coctail_non_alc_2"
                },
                {
                    name: "coctail (non alc) 3",
                    price: 2,
                    id: "coctail_non_alc_3"
                },
                {
                    name: "coctail (non alc) 4",
                    price: 1,
                    id: "coctail_non_alc_4"
                },
                {
                    name: "coctail (non alc) 5",
                    price: 5.5,
                    id: "coctail_non_alc_5"
                },
                {
                    name: "coctail (non alc) 6",
                    price: 6.2,
                    id: "coctail_non_alc_6"
                }
            ]
        },
        {
            name: "desserts",
            id: "desserts",
            category: 3,
            dishes: [
                {
                    name: "dessert 1",
                    price: 10,
                    id: "dessert_1"
                },
                {
                    name: "dessert 2",
                    price: 6,
                    id: "dessert_2"
                },
                {
                    name: "dessert 3",
                    price: 21,
                    id: "dessert_3"
                },
                {
                    name: "dessert 4",
                    price: 1,
                    id: "dessert_4"
                }
            ]
        },
        {
            name: "first courses",
            id: "first_courses",
            category: 4,
            dishes: [
                {
                    name: "first courses 1",
                    price: 12,
                    id: "first_courses_1"
                },
                {
                    name: "first courses 2",
                    price: 6,
                    id: "first_courses_2"
                },
                {
                    name: "first courses 3",
                    price: 44,
                    id: "first_courses_3"
                },
                {
                    name: "first_courses 4",
                    price: 11.5,
                    id: "first_courses_4"
                }
            ]
        },
        {
            name: "fish dishes",
            id: "fish_dishes",
            category: 5,
            dishes: [
                {
                    name: "fish dishes 1",
                    price: 12.1,
                    id: "fish_dishes_1"
                },
                {
                    name: "fish 2",
                    price: 6.3,
                    id: "fish_dishes_2"
                },
                {
                    name: "fish 3",
                    price: 44.2,
                    id: "fish_dishes_3"
                },
                {
                    name: "fish 4",
                    price: 12.5,
                    id: "fish_dishes_4"
                }
            ]
        },
        {
            name: "meat dishes",
            id: "meat_dishes",
            category: 6,
            dishes: [
                {
                    name: "meat dishes 1",
                    price: 122.1,
                    id: "meat_dishes_1"
                },
                {
                    name: "meat 2",
                    price: 61.3,
                    id: "meat_dishes_2"
                },
                {
                    name: "meat 3",
                    price: 44.2,
                    id: "meat_dishes_3"
                },
                {
                    name: "meat 4",
                    price: 712.5,
                    id: "meat_dishes_4"
                }
            ]
        },
        {
            name: "salads",
            id: "salads",
            category: 0,
            dishes: [
                {
                    name: "salad 1",
                    price: 22.1,
                    id: "salads_1"
                },
                {
                    name: "salad 2",
                    price: 161.3,
                    id: "salad_2"
                },
                {
                    name: "salad 3",
                    price: 414.2,
                    id: "salad_3"
                },
                {
                    name: "salad 4",
                    price: 72.5,
                    id: "salad_4"
                }
            ]
        }
    ];

export const model = new Model();
