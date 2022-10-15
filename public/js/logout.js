const logoutEventHandler = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    alert("You have been successfully logged out!");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#logout-button")
  .addEventListener("click", logoutEventHandler);
