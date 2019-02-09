'use strict'

let parkData = '';

//display the results
function displayResults(respJ){  
    for(let i = 0; i<respJ.data.length-1;i++){
        parkData = `<li><h3>${respJ.data[i].fullName}</h3>
                        <a href="${respJ.data[i].url}">${respJ.data[i].url}</a>
                        <p>${respJ.data[i].description}</p></li>`;
        $("#results-list").append(parkData);
        $('#results').removeClass('hidden');
    }; 
}

//build the results
function getParks(st, mr){
    //build the parameter obj
    let states = st;
    //states = states.replace(' ', '&stateCode=');
    states = states.split(' ').join('&stateCode=');
    console.log(states);
    let url = `https://api.nps.gov/api/v1/parks?stateCode=${states}&limit=${mr}`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert(`something went wrong: ${error.message}`));

}

//wait for click
function handleForm(){
    $('form').submit(event => {
        event.preventDefault();
        $('#results-list').empty();
        const searchState = $("#js-state").val();
        const maxResults = $("#js-max-results").val();
        getParks(searchState, maxResults);
    });
}

$(handleForm);