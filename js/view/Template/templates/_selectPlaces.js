export const SELECT_PLACES_TEMPLATE = () => {
    return `
    <div>
        <h1 class="initial-login__logo">Waiter</h1>
        <div class="popup__wrapper">
            <div class="popup__container">
                <div class="popup__container_select">
                    <p>We have found several places near you. Please, choose one in which you want to be served.
                        <span class="button" id="showList">Ok</span>
                    </p>
                    <h4 class="h4 hidden">Please, choose a place in which you want to be served.</h4>	
                    <ul class="popup__container_list hidden"></ul> 
                    <button class="popup__container_button button hidden" id="back">Back</button>
                    <button class="popup__container_button button hidden" id="select">Select</button>
                </div>
            </div>
        </div> 
    </div>`;
}  