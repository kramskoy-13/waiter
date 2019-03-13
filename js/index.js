document.addEventListener("DOMContentLoaded", function() {

    let text = 'Hello! Today I Will Be Your Waiter!';
    let length = 0;

    let textContainer = document.getElementById('textContainer');

    textContainer.parentNode.classList.remove('initial');

    setTimeout(function() {
        textContainer.parentNode.classList.add('loaded');
    }, 500);

    // function showText(piece) {
    //     if(text.length <= length) {
            setTimeout(function() {
                textContainer.parentNode.classList.add('completed');
            }, 3500);
    //     }
    //     else textContainer.innerHTML += piece;
    //     length++;
    //     setTimeout(function() {
    //         showText(text[length]);
    //     }, 100)
    // }
    // setTimeout(function() {
    //     return showText(text[length]);
    // }, 500);

});

