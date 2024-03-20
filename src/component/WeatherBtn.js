import React from 'react';

import { Button } from 'react-bootstrap';
// 리액트 부트스트랩 사용해보기

const WeatherBtn = () => {
  return (
    <div>
      <Button variant="light">현재 위치</Button>
      <Button variant="light">스웨덴</Button>
      <Button variant="light">시애틀</Button>
    </div>
  );
};

export default WeatherBtn;
