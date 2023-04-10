const banderas = document.getElementById('banderas')
const query = new URLSearchParams(window.location.search)
const params = query.get('name')
console.log(params);

const fetchWeatherData = async (city) => {
    const apiKey = '95bea71992aa84bc74e74172d32ba1f7';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${params}&units=metric&appid&lang=ES`);
    const data = await response.json();
    return data;
  }


document.addEventListener("DOMContentLoaded", e => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        
        const filtroData = data.filter(item => item.name.common === params)
        const weatherData = await fetchWeatherData(filtroData[0].capital);

        banderillas(filtroData, weatherData);
  } catch (error) {
    console.log(error);
  }
}



  

const banderillas = (data, weatherData) => {
    let elementos = ''
    data.forEach(item => {
      elementos += `
        <article class="card">
          <div class="card-content">
            <p>
              <b>Population: </b>
              ${item.population}
            </p>
            <p>
              <b>Capital: </b>
              ${item.capital}
            </p>
            <p>
              <b>Región: </b>
              ${item.region}
            </p>
            
            
            <p>
              <b>Humedad: </b>
              ${weatherData.main.humidity}%
            </p>
          </div> 
          <p>
              <b>Clima: </b>
              <span id="temperature">
              ${weatherData.weather[0].description}
              <img class="weather-icon" src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Icono de clima"> 
              
          </p>
             </span>
          <p>
              <b class="temperatura">${weatherData.main.temp} °C</b>
              
            </p>
          <h3>${item.name.common}</h3>

          <img src="${item.flags.svg}" alt="" class="img-fluid">
        </article>
      `
    });
    banderas.innerHTML = elementos
  }

  

  
