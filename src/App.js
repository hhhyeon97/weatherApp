import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import config from './config';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import ClipLoader from 'react-spinners/ClipLoader';
//const apiKey = config.apiKey;
const apiKey = '74283380a215dbfef8e3232bcff5db70';

/*
1. 앱이 실행되면 현재 위치 기반의 날씨가 보인다.
2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
3. 5개의 버튼이 있다. (1개는 현재 위치, 4개는 다른 도시)
4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
5. 현재 위치 버튼을 클릭하면 다시 현재 위치 기반으로 날씨 정보가 나온다.
6. 데이터를 들고 오는 동안 로딩 스피너가 표시 된다.
*/
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null); // 선택된 도시를 관리하는 상태 추가
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];
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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    //console.log('data', data);
    setWeather(data); // state에 현재 위치 기반 날씨 데이터 넣어주기
    setLoading(false);
    setSelectedCity(null); // 현재 위치 버튼 클릭 시 선택된 도시를 null로 설정
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    //console.log(`${city}의 날씨 data`, data);
    setWeather(data);
    setLoading(false);
    setSelectedCity(city); // 선택된 도시 업데이트
  };

  // useEffect 하나로 병합 - > 상황에 맞춰서 호출을 달리하기 !
  useEffect(() => {
    if (city == '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // useEffect의 역할 : component did update !
  // city state를 주시하고 있다가 city가 바뀌면 useEffect 함수 호출해주는 역할
  /*
  useEffect(() => {
    //console.log('city?', city);
    getWeatherByCity();
  }, [city]);
  */

  // weather 정보를 props로서 WeatherBox에 보내기

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherBtn
            cities={cities}
            setCity={setCity}
            selectedCity={selectedCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
