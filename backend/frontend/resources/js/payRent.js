let paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault();
    let amount = document.getElementById("amount").value;
    let reason = document.getElementById("reason").value;
    fetch("/tenant/payments", {
        method: 'POST',
        mode : "cors",
        credentials : "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: amount,
            reason: reason
        })
    }).then(response => {
        if(response.status === 200){
            alert('Payment successful');
            window.location.href = 'tenant-portal.html';
        }
        else{
            alert('An error occurred');
        }
    });
    
})

function logout(){
    fetch("/account/logout", {
        method: 'POST',
        mode : "cors",
        credentials : "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.status === 200){
            window.location.href = 'login.html';
        }
        else{
            alert('An error occurred');
        }
    })
}