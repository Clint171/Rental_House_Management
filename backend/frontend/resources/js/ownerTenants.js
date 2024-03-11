let select = document.getElementById('apartment-select');

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
            select.appendChild(option);
        });
    });
}

getApartments();

select.addEventListener('change', () => {
    if(select.value === 0) return;
    let apartmentId = select.value;
    fetch(`/owner/${apartmentId}/tenants`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let container = document.getElementById('container');
        container.innerHTML += `
            <h2>Tenants</h2>
        `;
        data.forEach((tenant) => {
            container.innerHTML += `
                <h3>${tenant._id}</h3>
                <p>${tenant.user.username}</p>
                <p>${tenant.user.email}</p>
            `;
    });
    })
});