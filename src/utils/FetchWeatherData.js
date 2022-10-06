import axios from 'axios';

const apikey = 'bc16Up2TNEaTr1mKHCBLacLRQnLzGHEn';
const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'

const getData = async () => {
    const response = await axios.get(``)
}

const FetchWeatherData = () => {
    getData();
    return (
    <div>FetchWeatherData</div>
  )
}

export default FetchWeatherData