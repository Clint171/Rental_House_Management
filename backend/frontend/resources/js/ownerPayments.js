let apSelect = document.getElementById('apartment-select');

let getApartments = async () => {
    fetch("/owner", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        data.forEach((apartment) => {
            let option = document.createElement('option');
            option.value = apartment._id;
            option.innerHTML = apartment.name;
            apSelect.appendChild(option);
        });
    });
}

getApartments();

apSelect.addEventListener('change', () => {
    if(apSelect.value === 0) return;
    let apartmentId = apSelect.value;
    fetch(`/owner/${apartmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        let container = document.getElementById('container');
        container.innerHTML += `
            <h2>Payments</h2>
        `;
        let tenants = data.tenants;
        let payments = [];
        tenants.forEach((tenant) => {
            tenant.paymentHistory.forEach((payment) => {

                payments.push({
                    name: tenant.user.username,
                    amount: payment.amount,
                    date: payment.date,
                    reason : payment.reason
                });
            });
        });
        payments.forEach((payment) => {
            container.innerHTML += `
                <h3>${payment.name}</h3>
                <p>${payment.amount}</p>
                <p>${payment.date}</p>
                <p>${payment.reason}</p>
            `;
        });
    });
});
