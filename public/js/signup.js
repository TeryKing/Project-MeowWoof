const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#firstName-signup").value.trim();
  const last_name = document.querySelector("#lastName-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const is_volunteer = document.querySelector('.volunteerCheckbox').checked;

  if (first_name && last_name && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        is_volunteer
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Error creating user account.");
    }
  }
};

document
  .querySelector("#signup-submit")
  .addEventListener("click", signupFormHandler);
