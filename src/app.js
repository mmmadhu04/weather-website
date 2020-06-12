const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name : 'Madhu M M'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About page',
        name : 'Madhu M M'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help page',
        msg : 'Welcome to help page ! Enter the location you want to search and click on Search button !',
        name : 'Madhu M M'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Location not provided !'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                address : req.query.address,
                forecastResponse,
                location
            })
        })
    })

    // res.send({
    //     forecast : 'It is raining',
    //     location : 'Bangalore',
    //     address : req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: 'Help article not found !',
        name: 'Madhu',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        msg: '404 Error !',
        name: 'Madhu M M',
        title: '404'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port + " !")
})