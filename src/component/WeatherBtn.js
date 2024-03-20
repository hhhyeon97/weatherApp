import React from 'react';

import { Button } from 'react-bootstrap';
// 리액트 부트스트랩 사용해보기

const WeatherBtn = ({ cities }) => {
  console.log('cities?', cities);
  return (
    <div>
      <Button variant="light">현재 위치</Button>

      {cities.map((item) => (
        <Button variant="light">{item}</Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
