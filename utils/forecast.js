const request = require('request')

const forecast=(latitude,longitude,callback)=>{
  const url='https://api.darksky.net/forecast/ff0f9812b4795794577ee1e329fc5e2a/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
  request({url:url,json:true},(error,response)=>{
    if (error){
      callback('Unable to connect to weather service',undefined)
    } else if(response.body.error){
      callback('Unable to find location',undefined)
    } else {
      //const data=JSON.parse(response.body)
      callback(undefined,{
        summary:response.body.daily.data[0].summary + ' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain.'
      })
    }
  })
}

module.exports={
  forecast:forecast
}

// const https=require('https')
//
// const url = 'https://api.darksky.net/forecast/ff0f9812b4795794577ee1e329fc5e2a/37.8267,-122.4233'
//
// const request = https.request(url,(response) => {
//   let data = ''
//
//   response.on('data',(chunk)=>{
//     data = data + chunk.toString()
//   })
//
//   response.on('end',()=>{
//     const body = JSON.parse(data)
//     console.log(body)
//   })
// })
//
// request.on('error',(error)=>{
//   console.log('An error',error)
// })
//
// request.end()
