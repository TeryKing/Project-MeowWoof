const newFormHandler = async (event) => {

  
    if (pet_name && species && pet_breed && pet_age && pet_gender && pet_size) {
      const response = await fetch(`/api/projects`, {
        method: 'GET',
        body: JSON.stringify({ pet_name, species,pet_breed, pet_age, pet_gender, pet_size}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile'); //
      } else {
        alert('Meep');
      }
    }
  };
  

  