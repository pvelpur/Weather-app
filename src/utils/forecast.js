const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c8cdd859059a5be11e933440bf0bf270/'+latitude + ',' + longitude
    // Can add more options to url (see documentation on darksky api website)
    // By adding ?key=value&... to the end of the url
    // First argument to request is an object where the url is from
    request({url, json: true}, (error, { body }) => {
      //const data = JSON.parse(response.body)
      if(error){
        callback("Unable to connect to weather service")
      }
      else if(body.error){
        callback("Unable to find location. Try again with new coordinates")
      }
      else{
        // CHALLENGE 1
        forecastData = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 'There is a ' + body.currently.precipProbability + '% chance of precipitation.'
        callback(undefined, forecastData) /*{
          summary: body.daily.data[0].summary,
          temperature: body.currently.temperature,
          precip_probability: body.currently.precipProbability
        })*/
      }
    });
  }

  module.exports = forecast