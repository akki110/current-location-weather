import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  // Fetching geolocation

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect (() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {setError(error.message)}
      )
    }
    else {
      setError(alert('Geolocation does not catch through the browser'))
    }
  }
  ,[])

  

  useEffect(() => {
    if(latitude && longitude){
      fetchData(latitude,longitude);
    };
  },[latitude,longitude])

 
  
  const [weatherData, setWeatherData] = useState({});
  
  
  const fetchData = async (latitude,longitude) => {
    try{
      const Response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&exclude=current&appid=866751a88d17af21947cbb8948acd680`)
      setWeatherData(Response.data);
      }
      catch(error) {
        setError('Failed to get data');
        }
        };


  return (
  <>
  
  <div className="app">
    
    {error ? <p>Error : {error}</p> :(
   
    <div className="container">
      {/* Top */}
      <div className="top">
        <div className="location">
          <p>{weatherData.name}</p>
        </div>

                 
        <div className="temp">
          {weatherData.main ? <h1>{weatherData.main.temp}°C</h1> : null}
        </div>
            
        <div className="discription">
          {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
        </div>
      </div>
      


      {weatherData.name != undefined && 
        <div className="bottom">
          <div className="feels">
            {weatherData.main ? <p>{weatherData.main.feels_like}°C</p> : null}
              <p>Feels Like</p>
          </div>
                  
          <div className="humidity">
            {weatherData.main ? <p>{weatherData.main.humidity}</p> : null}
              <p>Humidity</p>
          </div>
                
          <div className="wind">
            {weatherData.wind ? <p>{weatherData.wind.speed} KPH</p> : null}
              <p>Winds</p>
          </div>
        </div>
        

      }
                    
    </div>
    ) }
  </div>

  </>  
);
}


export default App
