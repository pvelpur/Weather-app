console.log("Client side js file loaded")

// client-side js fucntion fetch :D
// assynchronous operation so dont have access to data right away
// but will fun when data is available
// request funtion passes in callback at the second parameter but with fetch
// we have to use .then method on return value from fetch
//Example
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// Get the search button to do something when someone clicks it
const weatherForm = document.querySelector('form') // return javascript representation of the element
const elementSearch = document.querySelector('input')
const mesOne = document.querySelector('#mesOne')
const mesTwo = document.querySelector('#mesTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents refreshing browser (default behavior)
    
    const location = elementSearch.value
    
    mesOne.textContent = "Loading..."
    mesTwo.textContent = ''

    //Actual Code
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                mesOne.textContent = data.error
            }
            else{
                mesOne.textContent = data.location
                mesTwo.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })
})