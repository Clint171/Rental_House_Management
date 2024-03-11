function getDashboard(){
    function formatPayments(payments){
        payments = payments.reverse();
        let htmlString = '';
        for(let payment of payments){
            htmlString += `
            <div class="payment">
                <p>Amount: ${payment.amount}</p>
                <p>Date: ${new Date(payment.date).toLocaleString()}</p>
            </div>
            `
        }
        return htmlString;
    }
    fetch("/tenant/dashboard" , {
        method: "GET",
        mode : "cors",
        credentials : "include",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        if(response.status === 401 || response.status === 403){
            window.location.href = 'login.html';
        }
        else if(response.status == 404){
            let container = document.getElementById("container");
            container.innerHTML = `
            <h2>Welcome back</h2>
            <p>It looks like you haven't been assigned the apartment yet. Please contact your landlord.</p>
            <p>If already contacted, please wait for the landlord to assign the apartment to you.</p>
            <p>If you are a landlord, consider going to <a href="owner-portal.html">this portal</a> to assign an apartment to this tenant.</p>
            `
        }
        return response.json();
    }).then(data => {
        let container = document.getElementById("container");
        container.innerHTML = "";
        let user = data.user;
        let apartment = data.apartment;
        container.innerHTML = `
        <h2>Welcome back, ${user.username}</h2>
        <h3>Your information</h3>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <h3>Your Apartment</h3>
        <p>Apartment Name: ${apartment.name}</p>
        <p>Location: ${apartment.address}</p>
        <p>Rent: ${apartment.rent}</p>
        <h3>Your Payments</h3>
        <div id="payments">
        ${formatPayments(data.paymentHistory)}
        </div>
        `
    });
}

getDashboard();

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