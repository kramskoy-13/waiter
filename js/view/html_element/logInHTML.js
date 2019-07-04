class LogIn {

    constructor(parent, txt_h4, txt_btn, selector, listener) {
        this.parent = parent;
        this.subElements = [];
    }

    create() {
        this.parent.innerHTML = `
        <div class="login__wrapper">
             <div class="initial-login__wrapper">
                 <div class="initial-login__container scale-down">
                    <h1 class="initial-login__logo">Waiter</h1>
                    <div class="initial-login__greeting"></div>
                     <form id="signInForm" class="initial-login">
                         <div class="initial-login__container_inner">
                             <div class="initial-login__input-wrapper email">
                                 <label class="initial-login__label" for="email">Your Login (email/username)</label>
                                 <div class="initial-login__notification" id="notify-email">!</div>
                             </div>
                             <div class="initial-login__input-wrapper password">
                                 <label class="initial-login__label" for="password">Your Password</label>
                                <div class="initial-login__notification" id="notify-password">!</div>
                             </div>
                             <div class="initial-login__submit"></div>
                         </div>
                    </form>
                </div>
           
            </div>
        </div>
        `;
        this.subElements.forEach( elem => {
            console.log(elem)
            if(elem) {
                elem.init()
            }
        });

        // let elementToToggleMarkup = document.querySelector(this.selector);
        //     elementToToggleMarkup.addEventListener("click", () => {
        //         console.log('clicked toggleLoginMarkup')
        //         event.target.parentElement.previousElementSibling.classList.add('scale-down');
        //         setTimeout( () => {
        //             this.listener()
        //         }, 500);
        //     })

        // document.addEventListener("input", fillUserDataObject)
        // document.addEventListener("submit", submitLogin)
        // document.addEventListener('click', toggleErrorTab)

        setTimeout( () => {
            let container = document.querySelector('.initial-login__container');
            container.classList.remove('scale-down');
        },300);
    };

    addElements(...element) {
        debugger
        element.forEach(e => this.subElements.push(e))
    }

    destroy() {
        this.parent.innerHTML = "";
        document.removeEventListener("input", fillUserDataObject)
        document.removeEventListener("submit", submitLogin)
        // document.removeEventListener('click', toggleLoginMarkup)
        document.removeEventListener('click', toggleErrorTab)
    };
}

// const userSignIn = {
//     email    : '',
//     password : ''
// };

// function fillUserDataObject(event) {
//     if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
//     userSignIn[event.target.id] = event.target.value;
// }

// function submitLogin(event) {
//     event.preventDefault();
//     for(let key in userSignIn) {
//         if(userSignIn.hasOwnProperty(key)) {
//             window[key].nextElementSibling.classList.remove('error');
//             window[key].nextElementSibling.innerHTML = '!';
//         }
//     }
//     controller.validateUserInfo(userSignIn);
// }

// function toggleLoginMarkup(event){
//     console.log('clikced toggleLoginMarkup')
//     if(!event.target.id) return;
//     if(event.target.id !== 'signUp' && event.target.id !== 'signIn') return;
//     // event.target.parentNode.classList.add('bounce-animate');
//     event.target.parentElement.previousElementSibling.classList.add('scale-down');
//     // history.pushState(loginHTML[event.target.id], '', event.target.id);
//     setTimeout(function () {
//         controller.getLoginHTML(loginHTML[event.target.id]);
//     }, 500);
// }

// function toggleErrorTab(event) {
//     console.log('clikced toggleErrorTab')
//     if(!event.target.classList.contains('initial-login__notification')) {
//         let elem = document.querySelectorAll('.initial-login__notification');
//         if(elem.length > 0) { elem.forEach(function(elem) {
//             elem.classList.remove('opened');
//         })
//         }
//         return
//     }
//     event.target.classList.toggle('opened');
// }

module.exports = LogIn;