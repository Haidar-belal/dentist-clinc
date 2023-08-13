const { destroy, add, get, getAll, update, addDocument, getDocuments, updateDocument, deleteDocument, getAllForOneDoctor } = require('./handler');
const router = require('express').Router();
const upload = require('../../../utils/fileFunctions/file_pdf').upload;

router.post('/create', add);
router.get('/getall', getAll);
router.get('/get/:id', get);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

router.get('/getall/:doctor_id', getAllForOneDoctor);

router.post('/document/add', upload.single('document'), addDocument);
router.get('/document/get/:id', getDocuments);
router.post('/document/update/:id', updateDocument);
router.delete('/document/delete/:id', deleteDocument);

// router.post('/document/add', upload.single('document'), addDocument);

module.exports = router;