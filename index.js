const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./app/routes/app-routes');

// init express application
const app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// database connectio
mongoose.connect(config.get('db.url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('successfully connected!'))
    .catch((err) => console.log('connection failed'))

app.get('/bb', (req, res) => {
    res.render('index');
});

app.use('/', routes);

// setting up server
const Port = 3000 || process.env.PORT;
app.listen(Port, () => console.log(`Server is running on Port: ${Port}`));