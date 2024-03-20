import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
// 리액트 부트스트랩 사용해보기

const WeatherBtn = ({ cities, setCity }) => {
  //console.log('cities?', cities);

  return (
    <div>
      <Button variant="light">현재 위치</Button>
      {cities.map((item) => (
        <Button variant="light" onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
