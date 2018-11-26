//  Puerto
process.env.PORT = process.env.PORT || 3000;

//  Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//  Token
process.env.JWT_EXPIRATION = '1d';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'el-seed-de-desarrollo';

//  MongoDB
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//  Google Oauth
process.env.CLIENT_ID = process.env.CLIENT_ID || '985503738418-p6vr1v2dujuvte5u0hac75deqvl5p0nq.apps.googleusercontent.com';
// process.env.GOOGLE.CLIENT_ID= process.env.FACEBOOK.CLIENT_ID || '985503738418-p6vr1v2dujuvte5u0hac75deqvl5p0nq.apps.googleusercontent.com';
// process.env.GOOGLE.CLIENT_SECRET= process.env.FACEBOOK.CLIENT_SECRET || '985503738418-p6vr1v2dujuvte5u0hac75deqvl5p0nq.apps.googleusercontent.com';


//  Facebook Oauth
process.env.FACEBOOK_CLIENT_ID= process.env.FACEBOOK_CLIENT_ID || '1851546425153902';
process.env.FACEBOOK_CLIENT_SECRET= process.env.FACEBOOK_CLIENT_SECRET || '72f64df4fd85f2d24651c308f13ae5e2';


//  Cloudinary
process.env.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || 'ddon9fx1n'
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '395786779988163'
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '90RfpewtwL_oD9m9FsLuFS6Cf8k'