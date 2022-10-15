
    // const species = document.querySelector('#species').checked;
    // const gender = document.querySelector('#gender').checked;
    // const breed = document.querySelector('#breed').checked;
    // const age = document.querySelector('#age').checked;
    // const size = document.querySelector('#size').checked;
    // var element = document.querySelectorAll();\


checkedarrays = [];
console.log("hello1")
function filterclick(value, checked){
    for(i=0; i>checkedarrays.length; i++){
        if(element[i].checked === true){
            checkedarrays.push(element[i].name)
        }
    }
    console.log("hello")

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
.addEventListener('click', console.log("button pressed"));


// Assign names to your checkboxes
// give them all the same class
// var elemt = document.querySlectorALL() => array of element
// foor loop on the array
// element[i].checked === true
//  checkedarrays.push(`element[i].name`) => ["species=dog", "breed=clumber"]
// let url = `/results?checkedarrays.join("&&")`
// documnet.location.rplace(url)
