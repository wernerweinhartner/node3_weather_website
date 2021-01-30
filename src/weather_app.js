/*
console.log('Starting')


setTimeout(function(){ //funcao assincrona, 2 segundos
    console.log('2 second timer')
},2000)

setTimeout(function(){
    console.log('0 second timer')
},0)



console.log('Stopping')*/

const request = require('request')
/*
const url = 'http://api.weatherstack.com/current?access_key=37a71b9c3710b6154cc5e4f39ade23ee&query=37.8237,-122.4233&units=m'//para customizar as unidades: &units=m ou s ou f no final 
//ver o tempo em um determinado lugar usando API weatherstack
request({url: url, json: true}, (error, response) => { //json:true => returns parsed object
    //const data = JSON.parse(response.body)
    //console.log(data.current)
    if (error){
        console.log('Unable to access weather forecast')
    }

    else if (response.body.error){
        console.log('Unable to find location')
    }

    else{

    console.log("It is " +response.body.current.temperature)
    console.log("It feels like "+response.body.current.feelslike)
    }
})
//converter um endereco para latitude/longitude usando API de mapbox
const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoid2VybmVyaCIsImEiOiJja2pyZXA0cTQwNjY3MnJtdTVnajczcncwIn0.9FGQYz58JZL8xD38CyydFw&limit=1'

request({url: url2, json:true}, (error, response)=>{
    if (error){ //quando nao tem conexao com a internet por exemplo
        console.log('Error: Unable to access location')
    }

    else if (response.body.features.length === 0){// quando nao se passou coordenada apropriada por exemplo
        console.log('Unable to find location')
    }
    else{

    console.log("Longitude: " + response.body.features[0].center[0])
    console.log("Latitude: " + response.body.features[0].center[1])
    }
})

*/
/*
function geocode(address, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoid2VybmVyaCIsImEiOiJja2pyZXA0cTQwNjY3MnJtdTVnajczcncwIn0.9FGQYz58JZL8xD38CyydFw&limit=1'
    //encodeURIComponent() => para evitar caracteres especiais
    request({url:url, json:true}, (error, response) => {
        if (error){
            callback('Error: Unable to connect to location services', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
*/

const command = process.argv
var loc = command[2]
if (!loc){
    console.log("Please provide and address")
}
else{

const geocode = require('./geocode.js')
const forecast = require('./forecast')
geocode(loc, (error, data) => {
    if (error){
    return console.log('Error', error)
    }

    //console.log('Data', data)
    forecast(data.latitude,data.longitude, (error, Data)=>{
        if (error){
        return console.log('Error', error)
        }
        //console.log('Data \n', Data)
        console.log("Location: " + data.location)
        console.log("Temperature: " + Data.temperature)
        console.log("Feels like: " + Data.feelslike)
    })
})
}
//const forecast = require('./forecast')
/*
forecast(-29,-51, (error, data)=>{
    console.log('Error', error)
    console.log('Data \n', data)
})*/