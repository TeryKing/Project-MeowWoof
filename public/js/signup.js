const signupFormHandler = async (event) => {
    event.preventDefault();
  
    //const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const first_name = document.querySelector('#firstName-signup').value.trim();
    const last_name = document.querySelector('#lastName-signup').value.trim();
    const is_volunteer = document.querySelector('#volunteer-signup').value;
    // const adopt = document.querySelector('#adopt-signup'); -- might not be needed since adopt data is not in our user model

    // if (volunteer.checked) {
    //   is_volunteer.value == true;
    // } else {
    //   is_volunteer.value == false;
    // };

    
    if (email && password && first_name && last_name) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, password, first_name, last_name, is_volunteer }),
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