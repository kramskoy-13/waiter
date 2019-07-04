export const CONFIRMATION_TEMPLATE = (text = "...") => {
    return `
    <div>
        <h1 class="initial-login__logo">Waiter</h1>
        <div class="popup__wrapper">
            <div class="popup__container">
                <div class="popup__container_select">
                    <p>${text}</p>
                    <button class="popup__container_button button" id="confirm">Yes</button>
                    <button class="popup__container_button button" id="refuse">No</button>
                </div>
            </div>
        </div> 
    </div>`;
}  