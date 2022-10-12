const surrenderFormHandler = async (event) =>
    event.preventDefault();
  
    const species = document.querySelector('#species');
    const name = document.querySelectorAll('#name').value.trim();
    const gender = document.querySelector('#gender');
    const breed = document.querySelector('#breed').value.trim();
    const age = document.querySelector('#age').value.trim();
    const size = document.querySelector('#size');

    if (species && name && gender && breed && age && size) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ species, name, gender, breed, age, size }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Form sucessfully submitted!');
        console.log('New pet added to database.');
      } else {
        alert('Failed to sign up.');
      }
    }
  
  document
    .querySelector('#surrender-form')
    .addEventListener('submit', surrenderFormHandler);