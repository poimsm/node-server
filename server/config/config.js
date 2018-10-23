

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

//==========================
//  Google Client ID
//==========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '985503738418-p6vr1v2dujuvte5u0hac75deqvl5p0nq.apps.googleusercontent.com';


