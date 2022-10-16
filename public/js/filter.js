let checkedarrays = [];


// console.log("check1")

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
    
// console.log("3", url)
// console.log("3", ele.value)
// console.log("3", ele.checked)
}


const result = async() => {
    // event.preventDefault();
    console.log("check2")
    // const search = new URL("/results")
    let url = `/results?${checkedarrays.join('&')}`
    const response = await fetch(url,
        {
            method: 'GET',
        })
    console.log("done")
    
    if (response.ok) {
        document.location.replace(url);
      } else {
        alert('Failed to filter animals');
      }
   
}

// document
//     .querySelector('#applyfilter')
//     .addEventListener('submit', result);

// document
//     .querySelector('.filter')
//     .addEventListener('submit', filterClick);


// Assign names to your checkboxes
// give them all the same class
// var elemt = document.querySlectorALL() => array of element
// foor loop on the array
// element[i].checked === true
//  checkedarrays.push(`element[i].name`) => ["species=dog", "breed=clumber"]
// let url = `/results?checkedarrays.join("&&")`
// documnet.location.rplace(url)
