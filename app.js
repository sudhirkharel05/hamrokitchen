const mongoose = require('mongoose'); // install first & third party 
const path = require('path'); // no need to install 
const express = require('express'); //install first
const cors = require('cors');
const  bodyParser = require('body-parser')   //no need to install  use app.use(body praiser also)
const items = require('./routes/item_route')
const db = require('./Database/db');
const register_route = require('./routes/register_route');
const restaurantroute = require('./routes/restaurantroute');
const ordernow = require('./routes/orderroute');

const app = express(); // third party
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(items);
app.set('view engine', 'hbs');

const publicDir = path.join(__dirname, 'pictures');
app.use("/pictures",express.static(publicDir));
const booknow = require('./routes/bookingroute');
app.use(booknow);
app.use(register_route);
app.use(ordernow);
app.use(restaurantroute);


app.listen(3000, (err)=> {
    console.log("started at http://localhost:3000/home/")
})


