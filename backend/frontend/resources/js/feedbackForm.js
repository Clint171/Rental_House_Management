let feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function(event){
    event.preventDefault();
    let text = document.getElementById("text").value;
    fetch("/tenant/feedbacks", {
        method: "POST",
        mode : "cors",
        credentials : "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: text
        })
    }).then(response => {
        if(response.status === 200){
            window.location.href = 'feedback.html';
        }
        else{
            alert('An error occurred');
        }
    });
});