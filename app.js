const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogrouter')
const app = express();
const fs = require('fs');
const dbURI = fs.readFileSync(".secret").toString().trim();

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));
app.set('view engine', 'ejs');
console.log("connected");
const path = require('path');
const { nextTick } = require('process');
const staticPath = path.join(__dirname, './views/index.html');
console.log(staticPath);
console.log('connectedone');
app.use((req, res, next) => {
    console.log("mew request made");
    console.log("path", req.path);
    console.log("method", req.method);
    console.log("host-name", req.hostname);
    next();

});

app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(express.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    console.log('requested one is responded one');
    // res.send('<p>hello paaji </p>');
    // const blogs = [{
    //         title: "Education",
    //         snippet: "Try as soon as avoid it and get out from it to do something",
    //     },
    //     {
    //         title: "Politics",
    //         snippet: "Ovbiously for every uneducated and I am one of them",
    //     },
    //     {
    //         title: "Deppression ",
    //         snippet: "Its now habit to become depressed ",
    //     },
    // ]
    // res.render('index', {
    //     name: 'Akash Kumar',
    //     blogs,
    //     title: "index",
    // });
    res.redirect('/blogs');

});

app.use(blogRoutes);
app.use((req, res) => {
    res.status(404).sendFile('/views/404.html', { root: __dirname });

});