import axios from 'axios';

const apikey = 'X98EcF7UujbdW84G0WkmhQJ4FANx2sTh';
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