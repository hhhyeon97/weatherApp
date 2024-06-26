import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import config from './config';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import ClipLoader from 'react-spinners/ClipLoader';
//const apiKey = config.apiKey;
const apiKey = process.env.REACT_APP_API_KEY;
// console.log(apiKey);
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
  const [apiError, setApiError] = useState(null); // 에러 상태 추가
  const [id, setId] = useState(null); // id 상태 추가
  const [query, setQuery] = useState('');
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  ); // 현재 날짜와 시간 표시, 시간은 분까지만

  const getCurrentLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getWeatherByCurrentLocation(lat, lon);
        },
        (error) => {
          console.error('Error getting current location:', error);
          // 위치 정보 액세스 거부 또는 오류 발생 시 사용자에게 메시지 표시
          alert('현재 위치를 가져올 수 없습니다. 위치 설정을 확인해주세요.');
        },
      );
    } catch (error) {
      console.error('Error getting current location:', error);
      setApiError('위치 정보를 가져오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      //console.log('data', data);
      setWeather(data); // state에 현재 위치 기반 날씨 데이터 넣어주기
      setLoading(false);
      setSelectedCity(null); // 현재 위치 버튼 클릭 시 선택된 도시를 null로 설정
      setId(data.weather[0].id);
      setApiError(null); // 에러 상태 초기화
    } catch (error) {
      console.log('에러', error);
      setApiError('날씨 정보를 가져오는 중 오류가 발생했습니다.');
      setLoading(false);
      setSelectedCity(null);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      //console.log(`${city}의 날씨 data`, data);
      setWeather(data);
      setLoading(false);
      setSelectedCity(city); // 선택된 도시 업데이트
      setId(data.weather[0].id);
      setApiError(null); // 에러 상태 초기화
    } catch (error) {
      console.log('에러', error);
      setApiError('날씨 정보를 가져오는 중 오류가 발생했습니다.');
      setLoading(false);
      setSelectedCity(null);
    }
  };

  // useEffect 하나로 병합 - > 상황에 맞춰서 호출을 달리하기 !
  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(
        new Date().toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
      ); // 1분마다 현재 날짜와 시간 업데이트
    }, 60000); // 1분마다 업데이트
    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval 해제
  }, []);

  // useEffect의 역할 : component did update !
  // city state를 주시하고 있다가 city가 바뀌면 useEffect 함수 호출해주는 역할
  /*
  useEffect(() => {
    //console.log('city?', city);
    getWeatherByCity();
  }, [city]);
  */

  /* 검색 기능 */
  const search = async (e) => {
    if (e.key === 'Enter') {
      if (query.trim() !== '') {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`,
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error('올바른 도시명을 입력해주세요.');
            }
            return res.json();
          })
          .then((result) => {
            setWeather(result);
            setApiError(null); // 에러 초기화
            setQuery(''); // 검색 성공 후 검색어 초기화
          })
          .catch((error) => {
            //console.error('Error fetching data:', error);
            setApiError(error.message);
          });
      }
    }
  };

  // weather 정보를 props로서 WeatherBox에 보내기

  return (
    <div>
      <div className="top-content">
        <h2 className="title">Weather House</h2>
        <span className="date-area">{currentDateTime}</span>
        {/* 현재 날짜 및 시간 표시 */}
        <input
          id="inputCity"
          type="text"
          placeholder="도시명을 영어로 검색해주세요 : )"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {apiError ? ( // 에러 상태가 있는 경우 에러 메시지 표시
        <div className="container">
          <h3 className="error-text">{apiError}</h3>
        </div>
      ) : (
        <div className="container">
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={50} />
          ) : (
            <div>
              <WeatherBox weather={weather} id={id} />
              <WeatherBtn
                cities={cities}
                setCity={setCity}
                selectedCity={selectedCity}
                getCurrentLocation={getCurrentLocation}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
