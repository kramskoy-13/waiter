import { controller as Controller } from "../controller/Controller.js";
import createMockMenuData from "./mockMenuData.js";

class Model {
    constructor() {
        this.WTRLoaded = true; // <-- should be false
        this.userEmail = null;
        this.userPassword = null;
        this.userLoggedIn = true; // <-- should be false
        this.place = null;
        this.placeData = null;
        this.selectedCategory = null;
        this.cart = {
            dishes: {},
            totalPrice: 0,
            totalCount: 0
        }
        /* 
          dishes: {
            id: {
                    number: 1,
                    price: 22UAH
                    img: ///
                    divided: false
                }
          }
         */
    }

    /// APP ///

    checkIfAppAlreadyLoaded() {
        return this.WTRLoaded
    };

    setAppStateToLoaded() {
        this.WTRLoaded = true;
    };

    /// CART ///

    checkDishInCart(id) {
        return typeof this.cart.dishes[id] !== 'undefined'
    };

    getShoppingCartnfo() {
        let cartData = {};

        function copyCartData(cartObject, aimObject) {
            for(let property in cartObject) {
                if( cartObject.hasOwnProperty(property) ) { 
                    if(typeof property === "object") {
                        copyCartData(property, aimObject)
                    }
                    if(property !== "description" && property !== "ingredients") {
                        aimObject[property] = cartObject[property]
                    }
                }
            }                                              
        }
        copyCartData(this.cart, cartData);

        return cartData;
    };

    addItemToCart(dish, num) {
        let id = dish.id,
            dishes = this.cart.dishes,
            total = 0;

        if (!dishes[id]) {

            dishes[id] = {};

            for (let key in dish) {            
                if ( dish.hasOwnProperty(key) ) {
                    dishes[id][key] = dish[key];
                }
            }            
        }

        ++this.cart.totalCount;

        this.cart.dishes[id].number = num;

        for(let dish in dishes) {
            total += dishes[dish].number * dishes[dish].price;
        }

        this.cart.totalPrice += total;
            
        Controller.updateCartInfo(this.cart.totalCount)

        console.log("new item in the cart", this.cart.dishes[id])
        console.log("in number", this.cart.dishes[id].number)
    };

    /// LOGIN ///

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

    /// CURRENT PLACE ///

    fetchSelectedPlaceData(place) {
        return new Promise(resolve => {
            this.place = place; // <-- should be a reall id
            this.placeData = createMockMenuData(9); // <-- should be reall data
            setTimeout(() => resolve(this.placeData), 3000);
        })
    };

    getCurrentLocationPlaces() {
        /// HERE A REAL REQUEST TO THE DATA BASE SHOULD BE USED///
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve("result"), 2000);
        })
    };

    getCurrentPlaceData() {
        if (this.placeData && this.place) return { data: this.placeData, place: this.place };
        return null;
    };

    /// CATEGORIES ///

    getCurrentCategory() {
        return this.selectedCategory
    };

    setCurrentCategory(category) {
        this.selectedCategory = category;
    };

    /// REFRESH DATA ///

    refreshUserData() {
        this.userEmail = null;
        this.userPassword = null;
        this.userLoggedIn = false;
        this.place = null;
        this.placeData = null;
    };   

}

export const model = new Model();
