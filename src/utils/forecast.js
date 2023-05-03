const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=537b86b1bb4fc3d9d1ce9ebd542e31c3&query='+ latitude + ',' + longitude 
    
    request ({url, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast service !', undefined)
        }else if(body.error){
            callback('Unable to find this location, please provide a valid location !', undefined);
        }else {
            callback(undefined,body.current.weather_descriptions+ ". It is currently " 
                              +body.current.temperature+ " degrees out in the city of " 
                              +body.location.name+", and it feels like " 
                              +body.current.temperature+ " degrees !")
        }
    })
}

module.exports = forecast