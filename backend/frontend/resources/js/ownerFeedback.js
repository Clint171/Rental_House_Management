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

function getFeedbacks(){
    function formatFeedbacks(data){
        data = data.reverse();
        let htmlString='';
        for(let feedback of data){
            console.log(feedback);
            htmlString += `
            <div class="feedback">
                <h3>${feedback.user.username}</p>
                <p>${feedback.text}</p>
                <p>${new Date(feedback.date).toLocaleString()}</p>
            </div>
            `
        }
        return htmlString;
    }
    let apartmentId = select.value;
    fetch(`/owner/${apartmentId}/feedbacks` , {
        method: "GET",
        mode : "cors",
        credentials : "include",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        let container = document.getElementById("container");
        let user = data.user;
        let apartment = data.apartment;
        container.innerHTML += `
        ${formatFeedbacks(data)}
        `
    });
}

select.addEventListener('change', () => {
    getFeedbacks();
});