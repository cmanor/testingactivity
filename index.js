    const apiKey= "856cf893bf4748da5e5e119d50885a54";
    
    //getting zipcode data b/c I need to send lon and lat to another api
    const zipData = (zip) => 
        fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`)
          .then((res) => 
              res.json())
              //sends data to next api request
            .then((data) => lonlat(data));

//sends lon and lat to 2nd API that has weather data
      const lonlat = (deez) => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${deez.lat}&lon=${deez.lon}&units=imperial&appid=${apiKey}`)
          .then((res) => 
              res.json())
              //send data into the display weather function
              .then(data => displayWeather(data));

  
const dq = (dataPoint) => document.querySelector(dataPoint)

//function for displaying weather data
const displayWeather = (data) => {
      // get local machine date time
const date = new Date();

// get the date as a string
const d = date.toDateString();

// get the time as a string
const t = date.toLocaleTimeString();

//function for displaying weather data
//changes the html with the results I want
        dq(".min").innerHTML =`Low: ${data.main.temp_min}`;
        dq(".max").innerHTML =`High: ${data.main.temp_max}`;
        dq(".city").innerText = data.name;
        dq(".description").innerText =`Conditions: ${data.weather[0].description}`;
        dq(".icon").src =`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        dq(".temp").innerText =`${data.main.temp}°F`;
        dq(".humidity").innerText =`Humidity: ${data.main.humidity} %`;
        dq(".wind").innerText = `Wind speed: ${data.wind.speed} km/h`;
        dq('.date').innerHTML = d;
        dq('.time').innerHTML = t;
      };
      //sets up search function
      const search = () => 
        zipData(dq(".searchbar").value);
//makes the search button clickable
  dq(".search button").addEventListener("click", () =>
    search());
//sets up the enter key to also trigger the search function
  dq(".searchbar").addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        search();
      }
    });
// autoloads charlottes zip so I can check if my changes work
    zipData("28205");
    
module.exports = {zipData, lonlat, displayWeather, search};