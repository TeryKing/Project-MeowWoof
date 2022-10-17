let checkedarrays = [];

function filterClick(value, checked, name){
    console.log(value)
    console.log(checked)
    console.log(name)

    if(checked == true){
        checkedarrays.push(name);
        console.log("1", checkedarrays)
    }
    else if(checked !== -1){
        checkedarrays.splice(checked, 1)
        console.log("2", checkedarrays)
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


