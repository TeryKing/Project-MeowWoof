var submit = document.getElementById("submit-btn")



const handleSendEmail= async () => {

    response = await fetch("/api/user/email", {
        method: 'post',
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to send email");
      }
}

// submit.addEventListener('submit', handleSendEmail)