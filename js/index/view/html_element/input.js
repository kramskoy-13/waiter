class Input {

    constructor({type, name, id, autocomplete, own_class, value, parent, listener, callback}){
        this.type = type;
        this.name = name;
        this.id = id;
        this.autocomplete = autocomplete;
        this.own_class = own_class;
        this.value = value;
        this.parent = parent;
        this.listener = listener;
        this.callback = callback;
        this.HTMLelement = null;
    }
    
    init() {
        let HTMLelement = document.createElement("input");
        if(this.type)         { HTMLelement.setAttribute("type", this.type) }
        if(this.name)         { HTMLelement.setAttribute("name", this.name); }
        if(this.id)           { HTMLelement.setAttribute("id", this.id) }
        if(this.autocomplete) { HTMLelement.setAttribute("autocomplete", this.autocomplete) }
        if(this.own_class)    { HTMLelement.setAttribute("class", this.own_class) }
        if(this.value)        { HTMLelement.setAttribute("value", this.value) }

        this.HTMLelement = HTMLelement;
             
        let parent = document.querySelector(this.parent);
        if(parent == null) { console.log(`parent class ${this.parent} does not exist at ${this.own_class}`); return; }
        else { parent.appendChild(this.HTMLelement) }
        
        if(this.callback && this.listener) { this.HTMLelement.addEventListener(this.listener, this.callback) }
    };

}

module.exports = Input;