const router = require('express').Router();
const {
    addItems, getItems, getItem, addCategory, getCategories,
    getItemsByCategory, getItemByName, addStoreBillWithMaterials,
    getUnderLimitItem, getAllBillsWithMaterials, getAllBillsWithoutMaterials, 
    storeBillSearch, addStoreBill
} = require('./handler');
const  multer = require('../../../utils/fileFunctions/uploadImage');


router.post('/item/add', multer.single('images') ,addItems);
router.post('/category/add',addCategory);
router.get('/items',getItems);
router.get('/items/under-limit',getUnderLimitItem);
router.post('/item/search',getItemByName);
router.get('/item/:id',getItem);
router.get('/items/:ca_id',getItemsByCategory);
router.get('/category/all',getCategories);
router.post('/material-bill/add',multer.array('images'), addStoreBillWithMaterials);
router.get('/bills/materials', getAllBillsWithMaterials);
router.get('/new-bill/add-materials', getAllBillsWithoutMaterials);
router.post('/bill/search', storeBillSearch);
router.post('/bill/add', addStoreBill);


// for doctor to take item from the store
// router.put('/item/order/:doctor_id',orderItem);

module.exports = router;