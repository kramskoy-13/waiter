export const CURRENT_PURCHASE_TEMPLATE = (dish) => {
    
    return `
<div>
    <h1 class="logo">Waiter</h1>
    <div class="popup__wrapper">
        <div class="popup__container">
            <div class="popup__container_select pt-0 flex-ctr flex-wrap">
                <div class="popup__close">

                    <nav class="navigation">
                                <h4 class="navigation__sub-menu">
                                    <div id="categories">Categories</div>
                                    <div id="dishes">Dishes</div>
                                </h4>
                            <div class="close" id="close"></div>
                    </nav>

                </div>
                <div class="popup_image" style="background-image: url(${dish.img});"></div>
                <div class="dots">
                    <div>Name</div>
                    <div class="dots-holder"></div>
                    <div>${dish.name}</div>
                </div>
                <div class="dots">
                    <div>Price</div>
                    <div class="dots-holder"></div>
                    <div>${dish.price} UAH</div>
                </div>
                <div class="dots">
                    <div>Sum</div>
                    <div class="dots-holder"></div>
                    <div class="sum">${dish.price}</div>
                </div>
                <div class="popup__panel">
                    <button class="popup__panel_button button subtract" data-operation="subtract"></button>
                    <input class="cart-input" type="text" name="number" value="1">
                    <button class="popup__panel_button button add" data-operation="add"></button>
             </div> 
            </div>
        </div>
    </div>           
 </div>
    `
}