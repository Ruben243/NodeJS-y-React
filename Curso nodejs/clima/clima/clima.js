const axios = require('axios');

const getClima = async (lat, longt) => {
   /* console.log(lat);
    console.log(longt);*/
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longt}&appid=2d4f76772f204118a788e4f31b3de1e6&units=metric`);

    return resp.data.main.temp;
}

module.exports = {
    getClima
}