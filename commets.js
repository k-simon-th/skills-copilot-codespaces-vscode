//Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

//Set up the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Set up the port
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Set up the routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/comment', (req, res) => {
    const { name, comment } = req.body;
    fs.appendFile('comments.txt', `${name}: ${comment}\n`, err => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('index');
    });
});