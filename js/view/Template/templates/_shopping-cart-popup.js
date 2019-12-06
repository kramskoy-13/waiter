export const SHOPPING_CART_POPUP_TEMPLATE = (cart) => {
    let empty = cart.totalCount === 0,
        parent = document.createElement("div");

    parent.innerHTML = `
        <h1 class="logo">Waiter</h1>
        <div class="popup__wrapper ${empty ? 'flex-start' : ''}">
            <div class="popup__container">  
                <div class="popup__close">
                    <nav class="navigation">
                        <h4 class="navigation__sub-menu">
                            <div id="categories">Categories</div>
                            <div id="dishes">Dishes</div>
                        </h4>
                        <div class="close" id="close"></div>
                    </nav>
                </div>
                <div class="popup__container purchase__wrapper ${empty ? 'hidden' : ''}">
                    <div class="purchase__total-price">Total: <span id="total">${cart.totalPrice}</span> UAH</div>
                    <button class="button visited block">Purchase</button>
	            </div>  
    
            </div>
        </div>           
    `;

    let child = parent.querySelector(".popup__wrapper > .popup__container");

    if (!empty) {
        for (let dish in cart.dishes) {
            let aim = cart.dishes[dish],
                elem = document.createElement("div");

            elem.className = "popup__container shopping-cart__wrapper flex-ctr flex-wrap";
            elem.__inner_data = aim;
            elem.innerHTML = `
                <div class="close_wrapped delete-dish">
                    <div class="close"></div>
                </div>
                <div class="popup_image small" style="background-image: url(${aim.img});"></div>
                <div class="dots">
                    <div>Name</div>
                    <div class="dots-holder"></div>
                    <div>${aim.name}</div>
                </div>
                <div class="dots">
                    <div>Price</div>
                    <div class="dots-holder"></div>
                    <div>${aim.price} UAH</div>
                </div>
                <div class="dots">
                    <div>Sum</div>
                    <div class="dots-holder"></div>
                    <div class="sum">${(aim.price * aim.number).toFixed(2)}</div>
                </div>
                <div class="popup__panel">
                    <button class="popup__panel_button button subtract" data-operation="subtract"></button>
                    <input class="cart-input" type="text" name="number" value="${aim.number}">
                    <button class="popup__panel_button button add" data-operation="add"></button>
                </div> 
            `;
            child.appendChild(elem);
        }
    }
    else {
        child.classList.add("mb-30");

        let elem = document.createElement("div");
            elem.innerHTML = `
                    <div class="inner-b">
                        <h4 class="h4 big simple">Your cart is empty.</h4>
                    </div>`;
        child.appendChild(elem);
    }

    return parent;
}