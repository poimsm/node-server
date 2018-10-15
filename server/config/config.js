

//==========================
//      Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;

//==========================
//      Entorno
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========================
//      Base de Datos
//==========================
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://joopiter:Joopiter133@ds043987.mlab.com:43987/cafe-joopiter';
}
process.env.URLDB = urlDB;
