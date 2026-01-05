


const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorDiv = document.getElementById('error');
const loaderDiv = document.getElementById('loader');
const weatherContainer = document.getElementById('weather-container');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const forecastDiv = document.getElementById('forecast');

const apiKey = 'e829c7fe2fd239a435200fd5df4e9f1b';

searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});

function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (city === '') {
        showError('Please enter a city name');
        return;
    }
    
    showLoader();
    
    weatherContainer.style.display = 'none';
    errorDiv.style.display = 'none';
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            getWeatherForecast(city);
        })
        .catch(error => {
            showError(error.message);
            hideLoader();
        });
}

function getWeatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayForecastData(data);
            hideLoader();
        })
        .catch(error => {
            console.error('Forecast error:', error);
            hideLoader();
        });
}

function displayWeatherData(data) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    
    weatherContainer.style.display = 'block';
}

function displayForecastData(data) {
    forecastDiv.innerHTML = '';
    
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    dailyForecasts.slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div>${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <div>${Math.round(forecast.main.temp)}°C</div>
        `;
        
        forecastDiv.appendChild(forecastItem);
    });
}

function showLoader() {
    loaderDiv.style.display = 'block';
}

function hideLoader() {
    loaderDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message || 'An error occurred. Please try again.';
    errorDiv.style.display = 'block';
}

function demoMode() {
    if (apiKey === '929b8f52f2f84a2b60b9f39b79e8ecdd') {
        const demoMessageContainer = document.getElementById('demo-message-container');
        const container = document.querySelector('.container');
        const demoMessage = document.createElement('div');
        demoMessage.style.padding = '1rem';
        demoMessage.style.textAlign = 'center';
        demoMessage.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        demoMessage.innerHTML = '<strong>Demo Mode:</strong> Using sample data. Replace "YOUR_API_KEY" with a valid OpenWeatherMap API key for real data.';
        if (demoMessageContainer) {
            demoMessageContainer.appendChild(demoMessage);
        }
        container.insertBefore(demoMessage, cityInput.parentElement.parentElement);
        
        window.originalFetch = window.fetch;
        window.fetch = function(url) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (url.includes('weather?q=')) {
                        const cityMatch = url.match(/q=([^&]+)/);
                        const city = cityMatch ? cityMatch[1] : 'Unknown';
                        
                        resolve({
                            ok: true,
                            json: () => Promise.resolve({
                                name: city,
                                sys: { country: 'Demo' },
                                weather: [{ 
                                    description: 'demo weather', 
                                    icon: '01d' 
                                }],
                                main: {
                                    temp: 23.5,
                                    feels_like: 24.2,
                                    humidity: 65
                                },
                                wind: { speed: 3.6 }
                            })
                        });
                    } else if (url.includes('forecast?q=')) {
                        resolve({
                            ok: true,
                            json: () => {
                                const list = [];
                                const today = new Date();
                                
                                for (let i = 0; i < 5; i++) {
                                    const forecastDate = new Date(today);
                                    forecastDate.setDate(today.getDate() + i);
                                    forecastDate.setHours(12, 0, 0, 0);
                                    
                                    list.push({
                                        dt: Math.floor(forecastDate.getTime() / 1000),
                                        dt_txt: forecastDate.toISOString().replace('T', ' ').slice(0, 19),
                                        weather: [{ 
                                            description: 'demo forecast', 
                                            icon: i % 2 === 0 ? '01d' : '10d' 
                                        }],
                                        main: {
                                            temp: 20 + Math.random() * 10,
                                        }
                                    });
                                }
                                
                                return Promise.resolve({ list });
                            }
                        });
                    }
                }, 800);
            });
        };
    }
}

demoMode();