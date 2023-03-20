const form = document.querySelector('form');
form.addEventListener( 'submit', validateForm);

const inputFields = document.querySelectorAll('.inputboxes input');
inputFields.forEach ( (input) => {
    input.errormessage = document.querySelector(`#${input.id} + p.errormessage`);
    input.addEventListener ('change', validateInput);
});

function validateInput(e) {
    console.log(e.target.validity);
    if (e.target.validity.valid) {
        e.target.errormessage.textContent = "";
        e.target.errormessage.className = "errormessage";
    } else 
    {
        displayError(e.target);
    }
}

function validateForm(e) {
    inputFields.forEach( (input) => {
        if (!input.validity.valid) {  
            displayError(input);
            e.preventDefault();
        }
    });
    if (!validatePasswordMatch()) {
        e.preventDefault();
    }
}

function displayError(input) {
    if (input.validity.valueMissing) {
        switch (input.id) {
            case 'firstName':
                input.errormessage.textContent = "Please enter your first name!";
                break;
            case 'lastName':
                input.errormessage.textContent = "Please enter your last name!";
                break;
            case 'email':
                input.errormessage.textContent = "Please enter your email address!";
                break;
            case 'password':
                input.errormessage.textContent = "Please enter your password. (Password must be 8 to 16 characters long and contain at least one capital letter and number)";
                break;
            case 'confirmPassword':
            input.errormessage.textContent = "Please confirm your password!";
            break;
        } 
    } 
    else if (input.validity.typeMismatch && input.attributes.type.value == "email") {
        input.errormessage.textContent = "This doesn't look like a valid email address!";
    }
    else if (input.validity.patternMismatch) {
        switch (input.id) {
            case 'email':
                input.errormessage.textContent = "This doesn't look like a valid email address!";
                break;
            case 'phoneNumber':
                input.errormessage.textContent = "This doesn't look like a valid phone number!";
                break;
            case 'password':
                input.errormessage.textContent = "Password must be 8 to 16 characters long and contain at least one capital letter and number";
                break;
        } 
    }
    input.errormessage.className = "errormessage active";
}

function validatePasswordMatch() {
    if (inputFields[4].value !== inputFields[5].value) {
        inputFields[5].errormessage.textContent = "The passwords you entered do not match!"
        return true;
    }
    else {
        return false;
    }
}

