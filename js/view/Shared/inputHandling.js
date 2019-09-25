function handleNumbClick(input, element, data, callback = () => {}) {
    if (!event.target || !event.target.dataset.operation) return;
    switch (event.target.dataset.operation) {
        case "add": {
            if (+input.value === 40) return;
            ++input.value;
            break
        }
        case "subtract": {
            if (+input.value === 1) return;
            --input.value;
            break
        }
        default: return
    }
    setInputValue(input, element, data, callback);   
};

function handleNumbInput(element, data, callback = () => {}) {
    let reg = /\D+/g,
        e = event.target;
    e.value = e.value.replace(reg, "");
    if (+e.value > 40) e.value = 40;
    if (+e.value <= 0) e.value = 1;

    setInputValue(e, element, data, callback)
};

function setInputValue(i, e, d, c) {
    let r = (i.value * d.price).toFixed(2);

    if (e.constructor.name === "Array") {
        e.forEach(el => { if (typeof el === "object") el.innerHTML = r })
    }
    else {
        e.innerHTML = r;
    }

    c()
}

export { handleNumbClick, handleNumbInput };