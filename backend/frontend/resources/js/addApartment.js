let apartmentForm = document.getElementById('apartment-form');

apartmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let apartment = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        rooms: document.getElementById('rooms').value,
        occupiedRooms: document.getElementById('occupied').value,
        rent: document.getElementById('rent').value
    }

    fetch('/apartments/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apartment)
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
                window.location.href = 'apartments.html';
            }})
});