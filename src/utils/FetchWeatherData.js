import axios from 'axios';

const apikey = 'XMUYtoZGyj4nn6oqiFvdadAtS8hKS9b6';
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