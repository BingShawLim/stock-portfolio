const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))

// pk_7158d5b3d01e435bb00dd38d49a7ce37
function stockApi(cb, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_7158d5b3d01e435bb00dd38d49a7ce37', {json: true}, (err, res, body)=> {
        if(err){return console.log(err)}
        if(res.statusCode===200){
            cb(body)
        }
    })
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    stockApi(result => {
        res.render('home', {
            stock: result
        });
    }, 'fb');
});

app.post('/', (req, res) => {
    stockApi(result => {
        res.render('home', {
            stock: result
        });
    }, req.body.stock_ticker);
})

app.get('/about.html', (req, res) => {
    res.render('about')
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>console.log(`Server Listening on port ${PORT}`))