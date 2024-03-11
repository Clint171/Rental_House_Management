let loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event){
    event.preventDefault();

    let email = loginForm.email.value;
    let password = loginForm.password.value;

    fetch("/account/login", {
        method: 'POST',
        mode : "cors",
        credentials : "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(response => {
        if(response.status === 200){
            window.location.href = 'apartments.html';
        }
        else if(response.status === 401){
            alert('Invalid email or password');
        }
        else{
            alert('An error occurred');
        }
    })
});