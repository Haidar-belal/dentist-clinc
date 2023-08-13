const { destroy, add, getOne, getAll, update , loginHandler,  
    getAllDocument, addDocument,getAllDocumentAccommodation , addDocumentAccommodation, 
    getAllAbsenceOrders, addAbsenceOrder, addDoctorOrder, getAllManagers, absenceOrderReply, checkAllDocumentAccommodation,
    addCancelReservation, deleteAppointmentReservation, getAllDoctors, getAllDoctorsWorkHours, giveSalary, getAllSalariesForOneMonth
} = require('./handler');
const router = require('express').Router();
const upload = require('../../../utils/fileFunctions/file_pdf').upload;

//user 
router.post('/login', loginHandler);
router.post('/create', add);
router.get('/getall/managers', getAllManagers);
router.get('/getall/', getAll);
router.get('/get/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);
router.get('/doctors/getall', getAllDoctors);
router.get('/doctors-workhours', getAllDoctorsWorkHours);

//doctor document
router.get('/doctorDocument/:id', getAllDocument);
router.post('/createDocument', upload.single('document'), addDocument);

// doctor ducument accommodation
router.get('/doctorDocumentAccommodations/check', checkAllDocumentAccommodation);
router.get('/doctorDocumentAccommodation/:id', getAllDocumentAccommodation);
router.post('/createDocumentAccommodation', upload.single('document'), addDocumentAccommodation);

// absence order
router.put('/AbsenceOrder/reply/:manager_id', absenceOrderReply);
router.get('/absenceOrder/:id', getAllAbsenceOrders);
router.post('/createAbsenceOrder', addAbsenceOrder);

// doctor material order
router.post('/order/add/:doctor_id', addDoctorOrder);

// doctor cancel reservationn
router.post('/cancel-reservation', addCancelReservation);
router.post('/cancel-reservation/delete-reservation/:employee_id', deleteAppointmentReservation);

// salary
router.post('/salary/add', giveSalary);
router.get('/salary/getAll', getAllSalariesForOneMonth);




module.exports = router;