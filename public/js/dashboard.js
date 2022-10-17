// let checkbox = document.querySelector()
// let submitBtn = document.querySelector("#submit")

// const assignVoltoPetHandler = async (event) => {
//     event.preventDefault();
//     const checkbox = document.querySelector()
//     cos
// }
// const assignedAminal = document.querySelector('#project-name').value.trim();

const addAnimaltoCare = async(animal_id) => {
    // console.log(animal_id)
    const response = await fetch(`/api/animal/${animal_id}/current_user`,
        {
            method: 'PUT',  
            body: JSON.stringify({

            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

    if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to fetch user id');
      }

}
// }

const unassignAnimaltoCare = async(animal_id) => {
    // console.log(animal_id)
    const response = await fetch(`/api/animal/${animal_id}`,
        {
            method: 'PUT',  
            body: JSON.stringify({
                assigned_volunteer: null
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

    if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update assigned_volunteer');
      }

}

const adoptedBtn = async(animal_id) => {
    // console.log(animal_id)
    const response = await fetch(`/api/animal/${animal_id}`,
        {
            method: 'DELETE',  
            body: JSON.stringify({
                
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

    if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete animal from database');
      }

}

