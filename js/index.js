document.addEventListener("DOMContentLoaded", function() {

    let text = 'Hello! Today I Will Be Your Waiter!';
    let length = 0;

    let textContainer 	 = document.getElementById('textContainer');
	let initialContainer = document.getElementById('initialContainer');
	
	setTimeout(function() {
        textContainer.parentNode.classList.remove('initial');
    }, 250);
    setTimeout(function() {
        textContainer.parentNode.classList.add('loaded');
    }, 500);

     function showText(piece) {
         if(text.length <= length) {
             setTimeout(function() {
                 textContainer.classList.add('completed');
				 setTimeout(function(){
					 initialContainer.classList.add('to-login');
				 }, 1000)
             }, 1500);
         }
         else textContainer.innerHTML += piece;
         length++;
         setTimeout(function() {
             showText(text[length]);
         }, 100)
     }
     setTimeout(function() {
         return showText(text[length]);
     }, 1500);
	
});

