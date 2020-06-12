const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=" + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        
        if(error) {
            callback("Unable to connect to the weather service !")
        }

        else if(body.error) {
            callback("Unable to find location !")
        }

        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. There is " + body.current.precip + " % chance of rain. It feels like " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast