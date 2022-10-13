const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    //const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const first_name = document.querySelector('#firstName-signup').value.trim();
    const last_name = document.querySelector('#lastName-signup').value.trim();
    const is_volunteer = document.querySelector('#volunteer-signup');
    const adopt = document.querySelector('#adopt-signup');

    if (volunteer.checked) {
      is_volunteer.value == true;
    } else {
      is_volunteer.value == false;
    };

    if (adopt.checked) {
      adopt.value == true;
    } else { 
      adopt.value == false;
    };

    
    if (email && password && first_name && last_name) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, first_name, last_name, is_volunteer, adopt }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);




  