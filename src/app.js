const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Handlebars and views engine location Setup
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'El Mehdi Bazzine'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About',
        name : 'El Mehdi Bazzine'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title : 'Help',
        name : 'El Mehdi Bazzine'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address !'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if(error) {
            return res.send({
                error 
            })
        }
        forecast(latitude,longitude, (error, forecastData) =>{
            if(error) {
                res.send({
                    error
                })
            }
            res.send({
                address: location,
                weather: forecastData
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('notFound', {
        title : '404 Not Found',
        errorMessage : 'Help article not found !',
        name : 'El Mehdi Bazzine'
    })
})

app.get('*',(req,res) => {
    res.render('notFound', {
        title : '404 Not Found',
        errorMessage : 'Page not found, please provide a valid url or use tha navigation bar !',
        name : 'El Mehdi Bazzine'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port : 3000');
})