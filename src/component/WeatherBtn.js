import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
// 리액트 부트스트랩 사용해보기

const WeatherBtn = ({ cities, setCity, selectedCity, getCurrentLocation }) => {
  //console.log('cities?', cities);
  const handleCityClick = (city) => {
    setCity(city);
  };

  return (
    <div>
      <Button
        variant={selectedCity === null ? 'secondary' : 'light'}
        onClick={getCurrentLocation}
      >
        현재 위치
      </Button>
      {cities.map((item) => (
        <Button
          variant={selectedCity === item ? 'primary' : 'light'}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
