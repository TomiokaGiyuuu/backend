const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const path = require('path')
const https = require("https");

const PORT = 5000
const app = express()

// Views
app.set('views', './html');
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/chat', (req, res) => {
    res.render('chat');
})
app.get('/myProfile', (req, res) => {
    res.render('myProfile');
})
app.get('/',(req,res)=>{
    const key = "7d2ea264a67c0f8d9b9f2187668a3772";
    let city = "Nur-sultan";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            let text = JSON.parse(data);
            let temperature = text.main.temp;
            let descrip = text.weather[0].main;
            res.render('index', {temperatura: temperature, desc: descrip});
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})
app.use('/api', router)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () =>{ console.log(`Server is launched on port ${PORT}`)})
    } catch (e){
        console.log(e);
    }
}
start()