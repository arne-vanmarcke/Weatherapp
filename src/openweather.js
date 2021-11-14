const token='';

module.exports={
    get_wheater:(city,units='metric',lang='nl')=>{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${token}`;
        return new Promise((res,rej)=>{
            fetch(url)
            .then(result=>result.json())
            .then(result=>res(result))
            .catch(err=>rej(err))
        })
    },
    get_wheater_geo:(lat,long,units='metric',lang='nl')=>{
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&lang=${lang}&appid=${token}`;
        return new Promise((res,rej)=>{
            fetch(url)
            .then(result=>result.json())
            .then(result=>res(result))
            .catch(err=>rej(err))
        }) 
    }

}