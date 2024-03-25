import React from 'react';

// props로 날씨데이터를 받아옴 (props는 객체 타입)
// props 안에 있는 weather를 끌고 오기
const WeatherBox = ({ weather, id }) => {
  //console.log('weather', weather);
  // console.log('weather id', id);
  // 화씨 온도를 소수점 아래 두 자리까지 표시
  const fahrenheit = ((weather?.main.temp * 9) / 5 + 32).toFixed(2);

  // // 날씨 아이콘 선택
  // let weatherIcon;
  // switch (id) {
  //   case 800:
  //     weatherIcon = <i className="fas fa-sun"></i>; // 맑은 날씨
  //     break;
  //   case 801:
  //   case 802:
  //   case 803:
  //   case 804:
  //     weatherIcon = <i className="fas fa-cloud"></i>; // 구름이 있는 날씨
  //     break;
  //   case 500:
  //   case 501:
  //   case 502:
  //   case 503:
  //   case 504:
  //     weatherIcon = <i className="fas fa-cloud-rain"></i>; // 비가 오는 날씨
  //     break;
  //   // 기타 날씨 상태에 따라 아이콘 추가 가능
  //   default:
  //     weatherIcon = <i className="fas fa-question"></i>; // 기본 아이콘
  //     break;
  // }

  const iconUrl = `http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`;
  // console.log('iconUrl', iconUrl);

  return (
    <div className="weather-box">
      <h3 className="city-name">{weather?.name}</h3>
      <h4>
        {weather?.main.temp}°C &nbsp; <i className="fa-solid fa-droplet"></i>
        &nbsp;{weather?.main.humidity}
      </h4>
      <img
        className="icon-po"
        width={70}
        height={70}
        src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
      />
      <span className="desc">{weather?.weather[0].description}</span>
      {/* <img src={iconUrl} alt="icon"></img> */}
    </div>
  );
};

export default WeatherBox;
