import PopupSPTemplate from "../Template/PopupSPTemplate.js";
import { SELECT_PLACES_TEMPLATE } from "../Template/templates/_selectPlaces.js";
import { INSERT_TEXT } from "../Template/templates/insert/_insertText.js";

export class SelectPlaceView {

	constructor(wrapper, parent) {
		this.wrapper = wrapper;
		this.parent = parent;
	}

	selectPlaceToBeServed(places, flag) {
        console.log("selectPlaceToBeServed fires");
        let template = SELECT_PLACES_TEMPLATE;
        let parent = this.parent;
        let popup = parent.currentPopup;
        //this.selectedPlace = places[0]; // <-- corresponding the first element is set at PopupSPTemplate
        popup = new PopupSPTemplate({ wrapper: this.wrapper, template, flag });
		popup
            .initListener({
                selector: "#select", listener: "click", callback: () => {
                    let selectedLI = document.querySelector(".selected");
                    if (!selectedLI || !selectedLI.id) return parent.showErrorNotification();
                    parent.fetchSelectedPlaceData.bind(parent, selectedLI.id)();
                }
            })
            .initListener({
                selector: "#back", listener: "click", callback: parent.showConfirmationMessage.bind(parent,
                    {
                        message: INSERT_TEXT.saveDataNotification,
                        confirm: () => {
                            parent.refreshUserData.bind(parent)();
                            parent.getLoginSignInTemplate.bind(parent)();
                            popup.destroy();
                        },
                        cancel: parent.selectPlaceToBeServed.bind(parent, places, true)
                    })
            })
            .create()
            .showList(places)
	};
}