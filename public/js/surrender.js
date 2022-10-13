const surrenderFormHandler = async (event) =>
    event.preventDefault();
  
    const species = document.querySelector('#species').value;
    const name = document.querySelectorAll('#name').value.trim();
    const gender = document.querySelector('#gender').value;
    const breed = document.querySelector('#breed').value.trim();
    const age = document.querySelector('#age').value;
    const size = document.querySelector('#size').value;

    if (species && name && gender && breed && age && size) {
      const response = await fetch('/api/animal', {
        method: 'POST',
        body: JSON.stringify({ species, name, gender, breed, age, size }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Form successfully submitted!');
        console.log('New pet added to database.');
      } else {
        alert('Failed to sign up.');
      }
    }
  
  document
    .querySelector('#surrender-form')
    .addEventListener('submit', surrenderFormHandler);