let registrationForm = document.getElementById('register-form');

registrationForm.addEventListener('submit', function(event){
    event.preventDefault();

    let username = registrationForm.firstName.value +" "+ registrationForm.lastName.value;
    let email = registrationForm.email.value;
    let password = registrationForm.password.value;
    let confPassword = registrationForm.confPassword.value;

    if(password !== confPassword){
        alert('Passwords do not match');
        return;
    }

    fetch("/account/signup", {
        method: 'POST',
        mode : "cors",
        credentials : "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    }).then(response => {
        if(response.status === 201){
            window.location.href = 'apartments.html';
        }
        else if(response.status === 409){
            alert('Email already in use');
        }
        else{
            alert('An error occurred');
        }
    })
});