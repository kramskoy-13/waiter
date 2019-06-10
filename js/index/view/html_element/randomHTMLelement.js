class HTMLElement {

    constructor({tag, parent, own_class, id, type, name, value, autocomplete, text, listener, callback}){
        this.tag          = tag;
        this.parent       = parent;
        this.own_class    = own_class;
        this.id           = id;
        this.type         = type;
        this.name         = name;
        this.value        = value;
        this.autocomplete = autocomplete;
        this.text         = text;
        this.listener     = listener;
        this.callback     = callback;
        this.HTMLelement  = null;
    }
    init() {
        
        let HTMLelement = document.createElement(this.tag);
        if(this.type)         { HTMLelement.setAttribute("type", this.type) }
        if(this.name)         { HTMLelement.setAttribute("name", this.name); }
        if(this.id)           { HTMLelement.setAttribute("id", this.id) }
        if(this.autocomplete) { HTMLelement.setAttribute("autocomplete", this.autocomplete) }
        if(this.own_class)    { HTMLelement.setAttribute("class", this.own_class) }
        if(this.value)        { HTMLelement.setAttribute("value", this.value) }

        if(this.text) { HTMLelement.innerHTML = this.text }

        this.HTMLelement = HTMLelement;
 
        let parent = document.querySelector(this.parent);
        if(!parent) { console.log(`parent class ${this.parent} does not exist at ${this.own_class}`); return; }
        else { parent.appendChild( this.HTMLelement) }

        if(this.callback && this.listener) { this.HTMLelement.addEventListener(this.listener, this.callback) }
    }
}

module.exports = HTMLElement;