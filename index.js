//WEATHER PROGRAM (Github Upload (hiding my API Key))

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".weatherCard");
const apiKey = ""; //put your own API_KEY

weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); //default action of "submit" is reloading the page so prevent this default action

    const city = cityInput.value; //from <input> field

    if (city) {     //if valid city
        try {
            const latLonData = await getLatLonData(city); //fetch latitude and longitude for city

            // console.log(latLonData);
            const {lat: la,
                    lon: lo} = latLonData[0];   //destructure so you can use lat and lon in getting the city's weather data

            // console.log(la);
            // console.log(lo);
            const weatherData = await getWeatherData(la, lo);   //fetch weather data based on latitude and longitude parameters
            // console.log(weatherData);
            displayWeatherInfo(weatherData);                    //call displayWeatherInfo using the weather data
        }
        catch(error) {                      // catches any errors from the try block
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");    //if not a valid city, then show an error and allow user to reinput
    }
});


async function getWeatherData(lat, lon){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;     

    const response = await fetch(apiUrl);

    if (!response.ok) {                                         //if not able to fetch then throw an error
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json();                               //else return the weather data
}

async function getLatLonData(city){
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {                                             //if fetch doesn't go through then throw an error
        throw new Error("Could not fetch Lat and Lon data");
    }

    return await response.json();                                   //else return lat and lon data
}

function displayWeatherInfo(data) {
    const {name: city, 
            main: {temp,humidity},
            weather: [{description, id}]} = data;           // destructuring of data so that we can utilize specific data

    card.textContent = "";        //reset text content first (...if error was shown before to clean it up)
    card.style.display = "flex";  //allow card to be displayed now

    const cityDisplay = document.createElement("h1");                       //create elements
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;                                             //set textContent for each element
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);



    cityDisplay.classList.add("cityDisplay");                                   //add classes for each element to apply CSS styling
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);                                              //append each element in this order
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){

    switch (true)                                       //returns emoji representing type of weather based on weatherId
    {
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case(weatherId >= 300 && weatherId < 400):
            return "☔";

        case(weatherId >= 500 && weatherId < 600):
            return "☔";

        case(weatherId >= 600 && weatherId < 700):
            return "🌨️";

        case(weatherId >= 700 && weatherId < 800):
            return "🌁";

        case(weatherId === 800):
            return "☀️";

        case(weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}