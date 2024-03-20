import React from 'react';

// props로 날씨데이터를 받아옴 (props는 객체 타입)
// props 안에 있는 weather를 끌고 오기
const WeatherBox = ({ weather }) => {
  console.log('weather', weather);
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h3>
        {weather?.main.temp}°C/ {(weather?.main.temp * 9) / 5 + 32} °F
      </h3>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
