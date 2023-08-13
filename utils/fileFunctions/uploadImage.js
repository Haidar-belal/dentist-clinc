const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {  
        // cb(null, file.originalname);
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};

const mult = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = mult;  
