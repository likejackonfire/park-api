'use strict';

const apiKey = '1QMzVrCwlN36dusoZmro2LRlnzDI1A4jAkl0ETLe'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const state = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      console.log(state, maxResults)
      getParks(state, maxResults);
    });
  }

  function getParks(state, maxResults=10) {

    const url = `${searchURL}limit=${encodeURIComponent(maxResults)}&q=${encodeURIComponent(state)}&api_key=${encodeURIComponent(apiKey)}`;
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(jsonObj => displayResults(jsonObj))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function displayResults(jsonObj) {
 console.log(jsonObj);

  $('#results-list').empty();

  for (let i=0; i < jsonObj.data.length; i++ ){
    $('#results-list').append(
      `<li><h3>${jsonObj.data[i].fullName}</h3>
      <p>${jsonObj.data[i].description} Visit us here!<a href=${jsonObj.data[i].url}>${jsonObj.data[x].url}</a></p>
      </li>`
    )};
  
  $('#results').removeClass('hidden');
};

$(watchForm);