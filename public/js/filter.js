let checkedarrays = [];

function filterClick(value, checked, name){

    if(checked == true){
        checkedarrays.push(name);
    }
    else if(checked !== -1){
        checkedarrays.splice(checked, 1)
    }
}


const result = async() => {
    let url = `/results?${checkedarrays.join('&')}`
    const response = await fetch(url,
        {
            method: 'GET',
        })

    if (response.ok) {
        document.location.replace(url);
      } else {
        alert('Failed to filter animals');
      }

}


