
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf');
    },
    // filename: (req, file, cb) => {
    //     // cb(null, file.originalname);
    //     // new date().toISOString() + '-' +
    //     cb(null, Date.now() + path.extname(file.originalname)) ;
    // }
    // filename: function (req, file, cb) { 
    //     cb(null, file.fieldname + '-' + Date.now())
    //   }
    filename: (req, file, cb) => {  
        cb(null, Date.now() + "-" + file.originalname);
        // new date().toISOS tring() + '-' + 
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};



exports.upload =  multer({ storage: fileStorage, fileFilter: fileFilter });
