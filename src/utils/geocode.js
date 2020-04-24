const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHZlbHB1ciIsImEiOiJjazV1cmpwZmMwcTB6M21tY2NzNDJkMTlqIn0.I2xsptS4fvSgB8sp7ztoVQ&limit=1'
    //CHALLENGE 2
    request({url, json: true}, (error, {body}) => {
      if(error){
        //console.log("unable to connect to geocoding service")
        callback("Unable to connect to location services!", undefined)
      }
      else if(body.features.length === 0)
      {
        callback("No Matching location resuls. Try another search!")
      }
      else{
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        callback(undefined, {
          latitude,
          longitude,
          location: body.features[0].place_name
      })
    }
    })
  }

  module.exports = geocode