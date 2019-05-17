const express = require('express')
const session = require('express-session')
const path=require('path')
var hbs=require('hbs')
const {forecast} = require('../utils/forecast')
const {geocode} = require('../utils/geocode')


//const cookie=require('cookie-parser')

const app = express()
const port = process.env.PORT||3000

// app.use(cookie())
//
// var noOfUniqueVisitors=0;
// const visitorIdentifier=[]
// // set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined)
//   {
//     // no: set a new cookie
//     noOfUniqueVisitors+=1
//     console.log('Visitor identifier assigned : ',noOfUniqueVisitors)
//     var randomNumber=noOfUniqueVisitors;
//     visitorIdentifier.push(randomNumber)
//     res.cookie('cookieName',randomNumber, { maxAge: 30000, httpOnly: true });
//     console.log('cookie created successfully');
//   }
//   else
//   {
//     // yes, cookie was already present, reset timer
//     console.log('cookie exists', cookie);
//     res.cookie('cookieName',cookie, { maxAge: 30000, httpOnly: true });
//   }
//   next(); // <-- important!
// });


// Define paths for Express config
// This is used for '' path
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  //res.send('Your weather')
  res.render('index',{
    title:'Weather',
    name:'Andew Mead',
    email:'andrew@mead.io'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'Vivian Wong',
    helpText:'This is some helpful text',
    email:'vivian5096@gmail.com'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    name:'Vivien Lim',
    email:'vivien@example.com'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'You must provide an address'
    })
  }else{
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if (error){
        return res.send({error:error})
      }else{
        forecast(latitude,longitude,(error,forecastData)=>{
          if (error){
            return res.send({error:error})
          }else{
            res.send({
              forecast:forecastData['summary'],
              location,
              address:req.query.address,
            })
          }
        })
      }
    })
  }
})

app.get('/help/*',(req,res)=>{
  res.render('error',{
    title:'404',
    errorMessage: 'Help article not found.',
    name:'Vivien Lim',
    email:'vivien@example.com'
  })
})

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    errorMessage:'Page not found',
    name:'Vivien Lim',
    email:'vivien@example.com'
  })
})
//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
  console.log('Server is up on port %s.',port)
})
