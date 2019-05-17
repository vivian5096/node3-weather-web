const request = require('request')
//pk.eyJ1Ijoidml2aWFuNTA5NiIsImEiOiJjanZwMWRza3cxbzJnNDNxajdvcW5ybjJxIn0.kg24oNrS4cTLD3TmmTYAGw

const geocode = (address,callback)=>{
  const geo_url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoidml2aWFuNTA5NiIsImEiOiJjanZwMWRza3cxbzJnNDNxajdvcW5ybjJxIn0.kg24oNrS4cTLD3TmmTYAGw&limit=1"

  request({url:geo_url,json:true},(error,response)=>{
    if (error){
      callback('Unable to connect to location service',undefined)
    }else if (response.body.features.length===0){
      callback('Unable to find location. Try again with different search terms',undefined)
    }else{
      callback(undefined,{
        latitude : response.body.features[0].center[1],
        longitude : response.body.features[0].center[0],
        location : response.body.features[0].place_name
      })
    }
  })
}

module.exports={
  geocode:geocode
}
