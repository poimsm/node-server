

//==========================
//  Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;

//==========================
//  Entorno
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========================
//  Vencimiento del Token
//==========================
process.env.CADUCIDAD_TOKEN = '1h';

//==========================
//  SEED
//==========================
process.env.SEED = process.env.SEED || 'el-seed-de-desarrollo';

//==========================
//  Base de Datos
//==========================
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
