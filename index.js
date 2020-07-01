const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res)=> {
    res.redirect('home')
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>console.log(`Server Listening on port ${PORT}`))