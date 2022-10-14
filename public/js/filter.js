
    const species = document.querySelector('#species').checked;
    const gender = document.querySelector('#gender').checked;
    const breed = document.querySelector('#breed').checked;
    const age = document.querySelector('#age').checked;
    const size = document.querySelector('#size').checked;
checkedarrays = [];

function filterclick(value, checked){
    if(checked == true){
        checkedarrays.push(value);
    }
    else if(checked !== -1){
        checkedarrays.splice
    }
}

const result = async(event) => {
    event.preventDefault();
    const search = new URL("/results")
    await fetch(URL,
        {
            method: GET,
        
    })
}

document
.querySelector('#applyfilter')
.addEventListener('button', filterResults);