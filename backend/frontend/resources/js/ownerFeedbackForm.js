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

let feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let apartmentId = select.value;
    let feedback = document.getElementById('text').value;
    fetch(`/owner/${apartmentId}/feedbacks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
            text: feedback
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        window.location.href = "owner-feedback.html";
    });
});