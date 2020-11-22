import './App.css';

import React, { useEffect, useState } from 'react';

import logo from './logo.svg';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeater] = useState('');

    useEffect(() => {
        const getWeather = async () => {
            const response = await fetch(
                `https://api.weatherbit.io/v2.0/current?city=${city}&key=9c425d40a19240ecb7588645a68b9cd3`,
            );
            const weather = await response.json();
            console.log('weather received', weather.data[0]);
            setWeater(weather.data[0].weather);
        };
        if (city) {
            console.log('Getting weather for ', city);
            getWeather();
        }
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const getIcon = () => {
        if (city && weather?.icon) {
            const iconUrl = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
            return <img src={iconUrl} className='App-logo' alt='logo' />;
        }
        return <img src={logo} className='App-logo' alt='logo' />;
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
                {city && weather && <p>{weather.description}</p>}
                {getIcon()}
            </header>
        </div>
    );
}

export default App;
