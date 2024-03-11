function fetchDashboard(){
    fetch("/owner/apartments" , {
        method: 'GET',
        mode : "cors",
        credentials : "include",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if(response.status === 401) {
                window.location.href = 'login.html';
                return;
            }
            else if(response.status === 403){
                window.location.href = 'login.html';
                return;
            }
            else if(response.status === 400) {
                alert('Invalid data');
                throw new Error('Invalid data');
            }
            else{
                return response.json();
            }})
        .then(data => {
            let container = document.getElementById("container");
            container.innerHTML += `
            <p>Username: ${data.username}</p>
            <p>Email: ${data.email}</p>
            <h3>Apartments:</h3><p>${data.apartments}</p>
            `
        })
}

fetchDashboard();