const router = require('express').Router();
const { get, addBill, addPayer, addTax, getAllPatientBills, getAllForPdf, getAllPayedTax, addPayedTax, getAllTaxOnbills } = require('./handler');

// bill
router.get('/get/:id', get);
router.get('/getAll', getAllPatientBills);
router.get('/getAllForPdf', getAllForPdf);

router.post('/add', addBill);

// payer
router.post('/payer/add', addPayer);

// tax
router.post('/tax/add', addTax);

// payed tax
router.get('/tax/getAll', getAllPayedTax);
router.post('/tax/pay', addPayedTax);
router.get('/tax/to-pay', getAllTaxOnbills);




module.exports = router;