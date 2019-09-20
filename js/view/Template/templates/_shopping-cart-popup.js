export const SHOPPING_CART_POPUP_TEMPLATE = (cart) => {
    let insert = '';
    if(cart.totalCount && cart.totalPrice) {
        for(let dish in cart.dishes) {
            insert += `
            
            <div class="popup__container shopping-cart__wrapper flex-ctr flex-wrap">
                <div class="popup_image" style="background-image: url(${dish.img});"></div>
                <div class="dots">
                    <div>Name</div>
                    <div class="dots-holder"></div>
                    <div>dish.name</div>
                </div>
                <div class="dots">
                    <div>Price</div>
                    <div class="dots-holder"></div>
                    <div>${dish.price} UAH</div>
                </div>
                <div class="dots">
                    <div>Sum</div>
                    <div class="dots-holder"></div>
                    <div class="sum" id="sum">${dish.price}</div>
                </div>

                <div class="popup__panel">
                    <button class="popup__panel_button button subtract" id="subtract"></button>
                    <input id="cart-input" type="text" name="number" value="1">
                    <button class="popup__panel_button button add" id="add"></button>
                </div> 

            </div>
            `
        }
    }
    else {
        insert = "Your cart is empty.";
    }

    return `
    <div>
        <h1 class="logo">Waiter</h1>
        <div class="popup__wrapper">
            <div class="popup__container">

                <div class="popup__close">
                    <nav class="navigation">
                        <div class="close" id="close"></div>
                    </nav>
                </div>
                ${ insert }
            </div>
        </div>           
    </div>
    `
}