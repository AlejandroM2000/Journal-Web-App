// const { response } = require("express");
const email = document.querySelector("#login > div.form__input-group > input#email");
const loginPassword = document.querySelector("#login > div.form__input-group > input#password")
const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const registerBtn = document.querySelector("#createAccount > button.form__button");
const emailReg = document.querySelector("#createAccount > div.form__input-group > input#first-email");
const pwReg  = document.querySelector("#createAccount > div.form__input-group > #first-password");

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


document.querySelector("#login > button.form__button").addEventListener("click", function(e) {
    e.preventDefault();
    if(email.value.length == 0 || !email.value.match(emailRegex)){
        document.querySelector("form#login > .form__message--error").innerHTML = "<p>The email is not properly formatted</p>"
    } else {
        document.querySelector("form#login > .form__message--error").innerHTML = ""
        fetch('http://localhost:3000/login', {
            method: "POST",
            body: JSON.stringify({
                email: emailReg.value,
                password: loginPassword.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
         })
        .then(response =>{
            if(response.status == 201){
                alert("nice");
            }
            response.json();
        })
        .then(json => {
            console.log(json);
        });
    }
})

registerBtn.addEventListener("click", function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/register', {
            method: "POST",
            body: JSON.stringify({
                email: emailReg.value,
                password: pwReg.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
         })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
})

