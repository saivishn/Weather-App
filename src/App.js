import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import image from "./Assets/background.jpg"

function App() {

  const [city, setCity] = useState('');


  const [data, setData] = useState({});
  const [data1, setData1] = useState({});

  var latitude = "";
  var longitude = "";
  //const [latitude,setLatitude] = useState('');
  //const [longitude,setLongitude] = useState('');  

  //const url ='https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c7832139b23835263beb6ec1e88834b6'


  const handleCity = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };


  const searchLocation = async () => {
   
    try{/*city name*/
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c7832139b23835263beb6ec1e88834b6`);
    setData1(response.data);
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log(latitude);
    console.log(longitude);

    /*latitude and logitutde*/
    const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=c7832139b23835263beb6ec1e88834b6`);
    setData(response1.data);
    console.log(response1.data)

  } catch(error){
    alert("Invalid input");
  }
}
    

  return (
    <div style={{ backgroundImage:`url(${image})` }} className="app">
      <div className="welcome">
      <h2>Welcome to the Weather App</h2>
      
    </div>
    
      <div className="search">

        {/* search box*/}
        <input
          type="text"
          placeholder='enter city'
          value={city}
          onChange={handleCity}
        />

        <button onClick={searchLocation}>search</button>

      </div>
    {data.name ? (

<div className="container">
<div className="top">
  <div className='city'>
    <p>{data.name}</p>
  </div>


  <div className="temp">
    {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
  </div>

  <div className='description'>
    {data.weather ? <p>{data.weather[0].main}</p> : null}
  </div>
</div>


{
  data.coord && data.coord.lat !== undefined && data.coord.lon !== undefined &&

  <div className="bottom">
    <div className="feels">
      {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}</p> : null}
      <p>Feels Like</p>
    </div>

    <div className="humidity">
      {data.main ? <p className='bold'>{data.main.humidity.toFixed()}</p> : null}
      <p>humidity </p>
      <i class="bi bi-moisture" style={{ "color": "red" }}>
      </i>
    </div>

    <div className="wind">
      {data.main ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
      <p>Wind Speed</p>
    </div>
  </div>
}
</div>

    ): null}

</div>      

  );
}

export default App;
