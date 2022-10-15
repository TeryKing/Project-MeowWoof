const surrenderFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#petname").value;
  const species = document.querySelector("#species").value;
  const breed = document.querySelector("#breed").value;
  const age = document.querySelector("#age").value;
  const gender = document.querySelector("#gender").value;
  const size = document.querySelector("#size").value;
  const image = "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/288/2019/03/28062611/Image-Coming-Soon-Placeholder-1-300x300.png";

  if (name && species && breed && age && gender && size) {
    const response = await fetch("/api/animal", {
      method: "POST",
      body: JSON.stringify({
        species,
        name,
        gender,
        breed,
        age,
        size,
        image,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      alert(
        "Form submitted, a representative will reach out via email to discuss the surrender process with you."
      );
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#surrender-submit")
  .addEventListener("click", surrenderFormHandler);
