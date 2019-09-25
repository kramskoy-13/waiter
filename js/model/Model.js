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
            dishes = this.cart.dishes;

        if (!dishes[id]) {

            dishes[id] = {};

            for (let key in dish) {            
                if ( dish.hasOwnProperty(key) ) {
                    dishes[id][key] = dish[key];
                }
            } 
            
            ++this.cart.totalCount;
        }
       
        this.cart.dishes[id].number = num;

        this.cart.totalPrice = 0;

        for (let dish in dishes) {
            this.cart.totalPrice += +(dishes[dish].number * dishes[dish].price).toFixed(2);
        }
        
        Controller.updateCartInfo(this.cart)
    };

    deleteItemFromCart(id) {
        console.log("id",id)
        let dish = this.cart.dishes[id];

        if (!dish) return Controller.showErrorNotification("The id has not been found at cart.", id);

        --this.cart.totalCount;

        let sumToSubtract = dish.number * dish.price;

        this.cart.totalPrice = (this.cart.totalPrice - sumToSubtract).toFixed(2);

        delete this.cart.dishes[id]

        Controller.updateCartInfo(this.cart)
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
            this.placeData = createMockMenuData(8); // <-- should be reall data
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
