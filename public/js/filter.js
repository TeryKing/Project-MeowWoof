let checkedarrays = [];
let filterAside = $('#filter');
let filterbx = $('#filter input[type="checkbox"]');
let filterSquares = document.querySelectorAll(
    '#filter input[type="checkbox"]');

// console.log("check1")

function filterClick(value, checked){
    // console.log("@@@")
    if(checked == true){
        checkedarrays.push(value);
        console.log("1", checkedarrays)
    }
    else if(checked !== -1){
        checkedarrays.splice(checked, 1)
        console.log("2", checkedarrays)
    }
console.log("3", checkedarrays)

}

//trying a click function to test.

// function applyClick(){
//     var element = document.querySelectorAll()
//     for(i=0; i>element.length; i++){
//         if(element[i].checked === true){
//             checkedarrays.push(`element[i].name`)
//             let url = '/results?checkedarrays.join("&&")'
//             document.location.replace(url);
//         }
//     }

// } 


const result = async(event) => {
    event.preventDefault();
    console.log("check2")
    // const search = new URL("/results")
    await fetch("/results",
        {
            method: GET,
        })
        // search
    console.log("done")
    filterClick(checkedarrays);
    
}

// document
// .querySelector('#applyfilter')
// .addEventListener('submit', result);
document
.querySelector('.filter')
.addEventListener('submit', filterClick);


// Assign names to your checkboxes
// give them all the same class
// var elemt = document.querySlectorALL() => array of element
// foor loop on the array
// element[i].checked === true
//  checkedarrays.push(`element[i].name`) => ["species=dog", "breed=clumber"]
// let url = `/results?checkedarrays.join("&&")`
// documnet.location.rplace(url)
