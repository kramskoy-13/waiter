export const CONFIRMATION_TEMPLATE = ( message ) => {
    if (!message) {
        message = "Unfortunately, there is an error occured. Please, try to reload the Waiter to be served."
    }
    return `
    <div>
        <h1 class="logo">Waiter</h1>
        <div class="popup__wrapper">
            <div class="popup__container">
                <div class="popup__container_select">
                    <p>${message}</p>
                    <button class="popup__container_button button" id="refuse">No</button>
                    <button class="popup__container_button button" id="confirm">Yes</button>
                </div>
            </div>
        </div> 
    </div>`;
}  