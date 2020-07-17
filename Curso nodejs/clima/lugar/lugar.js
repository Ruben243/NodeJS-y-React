const axios = require('axios');

const getLugarLatLng = async(dir) => {

    const encodeUrl = encodeURI(dir);
    const instance = axios.create({
        baseURL: `https://geocode.xyz/${encodeUrl}?json=1 `,
        headers: { "x-rapidapi-key": "e527438528msh5a8ef19c3161c56p1cbf78jsn6b1b1da652e9" }

    });
    const resp = await instance.get();
    if (resp.data.standard.length===0) {
        throw new Error(`no hay resoltados para ${dir}`);
    }
    const data = resp.data;
    const direccion = data.standard.city;
    const lat = data.latt;
    const longt = data.longt;

    return {
        direccion,
        lat,
        longt
    }

}

module.exports= {
    getLugarLatLng
}
