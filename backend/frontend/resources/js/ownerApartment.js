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
    alert("Apartment changed to " + apartmentId);
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
        let apartment = data;
        let apartmentDetails = document.getElementById('container');
        apartmentDetails.innerHTML += `
            <h2>${apartment.name}</h2>
            <p>${apartment.address}</p>
            <p>Rooms : ${apartment.rooms}</p>
            <p>${apartment.occupiedRooms} occupied rooms.</p>
            <p>${apartment.rent} per month</p>
            <h2>Tenants</h2>
        `;
        apartment.tenants.forEach((tenant) => {
            apartmentDetails.innerHTML += `
                <h3>${tenant._id}</h3>
                <p>${tenant.user.username}</p>
                <p>${tenant.user.email}</p>
            `;
        });
    });
});