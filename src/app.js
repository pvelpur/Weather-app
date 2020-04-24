const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast') //no need to put .js extension?

// express is a function that is called to make a new express application
const app = express()

//For heroku or 3000 if locally
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Handlebars npm module will allow us to render dynamic documents, and easily 
// create code that we can reuse across pages
// Kinda allows for php like features ^^
// We will use hbs npm module because its easy to integrate with express
// hbs files should be in the root directory in a folder called views
app.set('view engine', 'hbs')
// Can customize name and location by the code below
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve (looks for index.html for the rool of the webapp)
app.use(express.static(publicDirectoryPath))

// Rendering an HTML file instead 
// res.render('index.html') <- This is static however and cant pass objects to it
// Handlebars (hbs) makes it easy to create dynamic pages with express js

app.get('', (req, res) => {
    //use render to render a view (hbs template)
    // since we already set up express to use hbs, we just need to supply to view name we want to use
    res.render('index', {
        title: 'Weather App',
        name: 'Prithvi Velpuri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Prithvi Velpuri"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "This is some helpful text",
        title: "Help",
        name: "Prithvi Velpuri"
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Prithvi',
//         age: 21
//     },
//     {
//         name: 'Maria',
//         age: 20
//     }
//     ])
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error}) //same as above since the 'error' name is same left and right side
            }
            
            res.send({
                forecast: forecastData,
                location, // or location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
        //Should return because cannot send multiple responses in JS
        // Will get "cannot set header after..." error
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: "Error 404",
        errorMessage: "Help article not found",
        name: "Prithvi Velpuri" 
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: "404",
        errorMessage: "Page Not Found",
        name: "Prithvi Velpuri" 
    })
})

// routes ex:
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server started up on port ' + port)
})