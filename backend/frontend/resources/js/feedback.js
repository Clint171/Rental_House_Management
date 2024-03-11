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
    fetch("/tenant/feedbacks" , {
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

getFeedbacks();

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