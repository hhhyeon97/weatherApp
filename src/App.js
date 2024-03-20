import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
const apiKey = config.apiKey;

/*
1. 앱이 실행되면 현재 위치 기반의 날씨가 보인다.
2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
3. 5개의 버튼이 있다. (1개는 현재 위치, 4개는 다른 도시)
4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
5. 현재 위치 버튼을 클릭하면 다시 현재 위치 기반으로 날씨 정보가 나온다.
6. 데이터를 들고 오는 동안 로딩 스피너가 표시 된다.
*/
function App() {
  const getCurrentLocation = () => {
    // console.log('getCurrentLocation!');
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let response = await fetch(url);
    // 생성한 URL을 사용하여 API에 요청을 보내고, 응답을 기다린다. ->
    // fetch 함수를 사용하여 비동기적으로 HTTP 요청을 수행한다.
    let data = await response.json();
    // API 요청에 대한 응답을 JSON 형식으로 파싱 - > response.json() 메서드를 사용하여 응답 본문을 JSON 형태로 변환 - >
    // 이를 변수 data에 저장 후 콘솔에 JSON 형식으로 파싱된 API 응답 데이터 출력
    console.log('data', data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <div>
      <div className="container">
        <WeatherBox />
        <WeatherBtn />
      </div>
    </div>
  );
}

export default App;
