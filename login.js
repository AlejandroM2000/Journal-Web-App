document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden")
    })

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden")
    })
})

document.querySelector("#second-password").addEventListener("blur", function() {
    const firstPw = document.querySelector("#first-password").value;
    if(this.value != firstPw){
        this.classList.add("form__input--error");
        document.querySelector("#second_password-error").innerHTML = '<p>The two passwords do not match!</p>'
    } else {
        document.querySelector("#second_password-error").innerHTML = ''
        this.classList.add("form__input--success");
    }
})

document.querySelector("#first-password").addEventListener("blur", function () {
    const pwText = this.value;
    let errorMessage = document.querySelector("#first_password-error");
    console.log(pwText.length < 8)
    console.log(pwText.search(/[!@#\$%\^&\*_]/i) < 0)
    console.log(pwText.search(/[0-9]/) < 0)
    if(pwText.length < 8 || pwText.search(/[!@#\$%\^&\*_]/i) < 0 || pwText.search(/[0-9]/) < 0){
        errorMessage.innerHTML = '<p>Your password does not meet one or more of the password requirements</p>';
        if(this.classList.contains("form__input--success")){
            this.classList.remove("form__input--success");
        }
        this.classList.add("form__input--error");
    } else {
        if(this.classList.contains("form__input--error")){
            this.classList.remove("form__input--error");
        }
        errorMessage.innerHTML = '';
        this.classList.add("form__input--success");
    }
})

document.querySelector("#first-password").addEventListener("focus", function(){
    if(this.classList.contains("form__input--error")){
        this.classList.remove("form__input--error");
    }

    if(this.classList.contains("form__input--success")){
        this.classList.remove("form__input--success")
    }
})


