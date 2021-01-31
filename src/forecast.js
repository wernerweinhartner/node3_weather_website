const request = require('request')

function forecast(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/current?access_key=37a71b9c3710b6154cc5e4f39ade23ee&query=' + latitude + ',' +longitude + '&units=m'
    request({url:url, json:true}, (error, response)=>{
        if (error){
            callback('Error: Unable to connect to location services', undefined)
        }
        else if (response.body.error){
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                name: response.body.location.name,
                //location: response.body.location.location,
                country: response.body.location.country,
                description: response.body.current.weather_descriptions

            })
        }
    })
}

module.exports = forecast