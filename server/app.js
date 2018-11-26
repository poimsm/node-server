require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport');
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// habilitar carpeta public
app.use( express.static( path.resolve(__dirname, '../public') ))

// configuración de rutas
app.use('/users', require('./routes/users'));
app.use('/apps', require('./routes/coupons'));
app.use('/apps', require('./routes/ticket-events'));
app.use('/apps', require('./routes/ticket-services'));
app.use('/apps', require('./routes/food'));
app.use('/apps', require('./routes/packs'));
app.use('/apps/delivery/', require('./routes/delivery'));



mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log("Base de dtaos ONLINE");    
});
 
app.listen(process.env.PORT , ()=>{
    console.log("Escuchando puerto:", process.env.PORT);
    
})