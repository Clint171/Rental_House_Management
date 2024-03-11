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

let usrSelect = document.getElementById('user-select');
let getUsers = async () => {
    fetch("/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        data.forEach((user) => {
            let option = document.createElement('option');
            option.value = user._id;
            option.innerHTML = user.username;
            usrSelect.appendChild(option);
        });
    });
}

getApartments();
getUsers();

function addTenant(){
    let apartmentId = apSelect.value;
    let user = usrSelect.value;
    fetch(`/owner/${apartmentId}/tenants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
            user: user
        })
    }).then((response) => {
        if(response.status !== 201){
            alert("Something went wrong");
            throw new Error("Error");
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        window.location.href = "owner-tenants.html";
    });
}