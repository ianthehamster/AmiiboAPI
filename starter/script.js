'use strict';

const btn = document.querySelector('.btn-weather');
const countriesContainer = document.querySelector('.countries');
const imageContainer = document.querySelector('.imgBx');
let input = document.querySelector('#input-field');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const renderAmiibo = function (data) {
  const { au } = data.release; // destructure it from the array of releases
  const html = `<h1>${data.character}</h1>
  <div>
    <h3>Game Series: ${data.gameSeries}</h3>
    <h4>Type: ${data.type}</h4>
    <p> Date of release in Australia: ${au}</p>
    </div>
    <br />
  `;
  countriesContainer.insertAdjacentHTML('beforebegin', html);
};

///////////////////////////////////////
// AmiiboAPI
async function getAmiiboData(amiiboSeries) {
  try {
    // Code inside here is the "try" block

    // Construct the API URL based on the amiiboSeries parameter
    const apiURL = `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${amiiboSeries}`;

    // Fetch data from the API
    const response = await fetch(apiURL);

    // Check if the response status is not OK
    if (!response.ok) {
      // If the response is not OK, throw an error!
      throw new Error(`Network response was not ok`);
    }

    // Parse the response JSON data
    const data = await response.json();

    // Return parsed data
    return data;
  } catch (error) {
    // Code inside here is the "catch" block

    // Handle errors here!
    console.error('Error fetching data', error);

    // Return null to indicate an error occurred!
    return null;
  }
}

/////////////////////////////////////////////////////
/** Note the keyword "await" means it pauses execution of the code until that line of code is resolved
 * e.g., await fetch(apiURL) pauses execution of the code until the 'fetch' operation is complete. The code does not proceed until the response from the API is received and the promise resolved!
 */

// Usage
const amiiboSeries = 'Super Smash Bros.';
let index;

function test(index1) {
  let imgElement;
  getAmiiboData(amiiboSeries, index)
    .then(amiiboData => {
      if (amiiboData) {
        console.log('Amiibo data:', amiiboData);
        const { amiibo } = amiiboData;
        const indexToExtract = index1;
        const extractedObject = amiibo[indexToExtract];
        console.log(extractedObject);
        renderAmiibo(extractedObject);
        return extractedObject.image;
      }
    })
    .then(res => {
      imgElement = document.createElement('img');
      imgElement.src = `${res}`;

      imageContainer.appendChild(imgElement);
      return wait(150);
    })
    .then(() => {
      // imgElement.style.display = 'none';
      return imgElement;
    })
    .then(res => {
      imageContainer.removeChild(imgElement);
      console.log(res);
      imgElement = null;
      return imgElement;
    })
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error));
}

btn.addEventListener('click', function () {
  test(input.value);
});
