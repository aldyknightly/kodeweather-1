const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '707614f23ae262cd58bacbb5f0a40fb8';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {weather:null, error:null});
});

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, Please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, Please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
});

app.listen(process.env.PORT || 8080, function() {
    console.log("Kode weather listening on port 8080")
})