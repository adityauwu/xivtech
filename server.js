const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = "595dd51e702047b5fdec73a12c086fa2";
// console.log(apiKey.key);
var answer =[
];
var outputs=[
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/getWeather', function (req, res) {
res.render('index', { outputs: outputs, error: null});
})

app.post('/getWeather', function (req, res) {
//  let city = req.body.city;
answer.push(req.body.city);
console.log(answer);
let n = answer.length;
let city= answer[n-1];

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
         let weatherText = 'Error';
         outputs.push(weatherText);
        res.render('index', {weather: weatherText, outputs: outputs, error: null});
      } else {
var tempinc= (weather.main.temp-32)*(5/9);
        let weatherText = `It's ${tempinc} degrees Celcius in ${weather.name}!`;

    outputs.push({weatherText});
console.log(outputs);
        res.render('index', {weather: weatherText, outputs: outputs, error: null});
      }
    }

  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
