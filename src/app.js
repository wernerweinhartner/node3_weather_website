const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const forecast = require('./forecast')
const geocode = require('./geocode')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
app.set('view engine', 'hbs') //exatamente isso para usar hbs ==> dinamico 
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath) //caso o nome do diretorio nao seja views, eh preciso indica-lo explicitamente

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath) //para o app usar partials de hbs

//para dar acesso e usar arquivo puro de html
//index eh nome especial, para a pagina mais generica
/*
app.get('', (req, res)=>{ //req = request, res = response
    res.send('<h1>Weather</h1>') //html
})
*/

/*
app.get('/help', (req, res)=>{ //routes no primeiro argumento de get (string)
    res.send({ //json object
        name: 'Werner',
        age: 19
    })
})

app.get('/about', (req, res)=>{
    res.send('<h1>My weather application</h1>')
})
*/

app.get('', (req, res)=>{
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Werner Weingartner'
    }) //se usa extensao hbs para ser dinamico.
    //o nome do diretorio onde o arquivo hbs esta tem que ser views.
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error){
            return res.send({error:'error'})
        }
    
        //console.log('Data', data)
        forecast(data.latitude,data.longitude, (error, Data)=>{
            if (error){
                return res.send({error:'error'})
            }
            //console.log('Data \n', Data)
            res.send({
                Location: data.location,
                Temperature: Data.temperature,
                Feelslike: Data.feelslike
            })
            /*
            console.log("Location: " + data.location)
            console.log("Temperature: " + Data.temperature)
            console.log("Feels like: " + Data.feelslike)*/
        })
    })
    
})

app.get('/about', (req, res)=>{ // se o arquivo eh hbs, tem que usar explicitamente 
    //o render e a extensao. se nao for arquivo dinamico, html e app.use(express.static()) eh suficiente

    res.render('about.hbs', {
        title: 'About me',
        name: 'Werner Weingartner'
    })
})

app.get('/help', (req, res)=>{
    res.render('help.hbs', {
        title: 'Help',
        message: 'Refresh the page',
        name: 'Werner Weingartner'
    })
})
/*app.get('', (req, res)=>{
    res.render('index.hbs') //se usa extensao hbs para ser dinamico
})
*/

app.get('/help/*', (req, res)=>{
    res.render('error.hbs', {
        title: '404 Help',
        name: 'Werner Weingartner',
        message: 'Help article not found'
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({ //so pode send uma vez
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('*', (req,res)=>{ //wild character que significa todo o resto. tem que ser a ultima coisa
    res.render('error.hbs', {
        title: '404',
        name: 'Werner Weingartner',
        message: 'Page not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

/*
para render um elemento hbs, colocar {{>}} no arquivo html
adicionar -e js, hbs no final do comando nodemon para o servidor reiniciar
*/