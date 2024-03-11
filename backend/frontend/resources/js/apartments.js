let apartmentContainer = document.getElementById('apartment-container');

function getApartments() {
    fetch("/apartments/").then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(apartment => {
            apartmentContainer.innerHTML += `
            <div class="apartment" id="${apartment._id}" onclick="viewApartment(${apartment._id})">
            <div class="apartmentDetails">
                <h3>${apartment.name}</h3>
                <address>${apartment.address}</address>
                <h4>Rent</h4>
                <span>Ksh ${apartment.rent}</span>
                <h4>Rooms available</h4>
                <span>${apartment.rooms - apartment.occupiedRooms}</span>
            </div>
            <div class="apartmentBtns">
                <button class="btn" onclick="viewApartment(${apartment._id})">View</button>
                <button class="btn" onclick="bookApartment(${apartment._id})">Book</button>
            </div>
        </div>
                
            `;
        });
    });
}

getApartments();

function viewApartment(apartmentId){

}
