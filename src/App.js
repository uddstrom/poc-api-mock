import './App.css';

import React, { useEffect, useState } from 'react';

import logo from './logo.svg';

// https://api.weatherbit.io/v2.0/current?city=Stockholm,SE&key=9c425d40a19240ecb7588645a68b9cd3
// https://api.weatherbit.io/v2.0/forecast/daily?city=Stockholm,SE&key=9c425d40a19240ecb7588645a68b9cd3

function App() {
    const [city, setCity] = useState('');
    const [current, setCurrent] = useState('');
    const [forecast, setForecast] = useState('');
    const API_BASE_URL =
        process.env.REACT_APP_API === 'FAKE'
            ? 'http://localhost:9090'
            : 'https://api.weatherbit.io';

    useEffect(() => {
        const getCurrentWeather = async () => {
            const response = await fetch(
                `${API_BASE_URL}/v2.0/current?city=${city}&key=9c425d40a19240ecb7588645a68b9cd3`,
            );
            const current = await response.json();
            setCurrent(current.data[0].weather);
        };

        const getForecast = async () => {
            const response = await fetch(
                `${API_BASE_URL}/v2.0/forecast/daily?city=${city}&key=9c425d40a19240ecb7588645a68b9cd3`,
            );
            const forecast = await response.json();
            setForecast(forecast.data[0].weather);
        };

        if (city) {
            getCurrentWeather();
            getForecast();
        }
    }, [city, API_BASE_URL]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const renderWeather = () => {
        if (city && current && forecast) {
            return (
                <>
                    <h3>Current</h3>
                    <p>{current.description}</p>
                    {getIcon(current.icon)}
                    <h3>Forecast</h3>
                    <p>{forecast.description}</p>
                    {getIcon(forecast.icon)}
                </>
            );
        }
        return <img src={logo} className='App-logo' alt='logo' />;
    };

    const getIcon = (icon) => {
        const iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        return <img src={iconUrl} className='App-logo' alt='logo' />;
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <select onChange={handleCityChange}>
                    <option value=''>Välj stad</option>
                    <option value='Stockholm,SE'>Stockholm</option>
                    <option value='Gothenburg,SE'>Göteborg</option>
                    <option value='Malmo,SE'>Malmö</option>
                </select>
                <br />
                <br />
                {renderWeather()}
            </header>
        </div>
    );
}

export default App;
