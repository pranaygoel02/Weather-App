import axios from 'axios';

const apikey = 'UgFnRFLEqTAdfjCKuzriZgCAkiijEijN';
const url = 'https://dataservice.accuweather.com/locations/v1/cities/search'

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