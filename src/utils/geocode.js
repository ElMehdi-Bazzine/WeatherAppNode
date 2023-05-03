const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZWxtZWhkaWkiLCJhIjoiY2xkYmQwbXRxMDk2ZDN5cnpmYWE4NzljcSJ9.6yHpYZYT0oH4FyNmpLQHlQ&limit=1'
    
    request ({url, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service !', undefined)
        }else if(body.features.length == 0){
            callback('Unable to find this location, please provide a valid location !', undefined);
        }else {
            callback(undefined,{location: body.features[0].place_name,
                               longitude: body.features[0].center[0],
                               latitude : body.features[0].center[1]})
        }
    })
}

module.exports = geocode