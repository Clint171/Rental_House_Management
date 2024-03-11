function getPaymentHistory(){
    function formatPayments(payments){
        let htmlString = "";
        for(let i = 0; i < payments.length; i++){
            let payment = payments[i];
            htmlString += `
            <div class="payment">
                <p>Date: ${new Date(payment.date).toLocaleString()}</p>
                <p>Amount: ${payment.amount}</p>
                <p>Reason: ${payment.reason}</p>
            </div>
            `
        }
        return htmlString;
    }
    fetch("/tenant/payments", {
        method: 'GET',
        mode : "cors",
        credentials : "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.status === 200){
            response.json().then(data => {
                let container = document.getElementById("container");
                container.innerHTML += formatPayments(data);
            });
        }
        else{
            alert('An error occurred');
        }
    })

}

getPaymentHistory();

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