const multer = require('multer');
const doctordocument = require('./models/doctordocument');
const {User, DoctorDocument, DoctorDocumentAccommodation, AbsenceOrder, DoctorMaterialOrder, DoctorCancelReservation, Salary} = require('./service');
const {Store} = require('../stores/service');
const {sequelize} = require('../../../utils/database/config');
const httpStatus = require('../../../utils/constants/httpStatus');
const { AppointmentReservation } = require('../appointments/service');
// const { AppointmentReservation } = require('../');



// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // cb(null, 'public/pdf/contractor');
//         cb(null, '././././Documents');
//     },
//     filename: (req, file, cb) => {
//         // cb(null, file.originalname);
//         // new date().toISOString() + '-' +
//         cb(null, Date.now() + path.extname(file.originalname)) ;
//     }
// });
// const fileFilter = (req, file, cb) => {
//         // cb(null, true);
//         const fileTypes = /pdf/
//         const mimeType = fileTypes.test(file.mimeType);
//         const extname = fileTypes.test(path.extname(file.originalname));
//         if(extname && mimeType){
//             return cb(null, true);
//         }
//         cb('Give proper files formats to upload');
// };

// const upload = multer({ storage: fileStorage, limits: {/**fileSize: '1000000'*/} ,fileFilter: fileFilter }).single('pdf')

module.exports = {
    
   // user
    

    getAll: async (req, res) => {
        // const {type} = req.params;
        // console.log(type);
        //  const type = req.body;
        const result = await User.getAllUsers();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllManagers: async (req, res) => {
        // const {type} = req.params;
        // console.log(type);
        //  const type = req.body;
        const result = await User.getAllManager();
        res.status(result.code).send({
            data: result.data,
        });
    },


    add: async (req, res) => {
        const data = req.body;
        console.log("kkk");
        const result = await new User(data).addUser();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        // const type = req.params.type;

        const result = await User.getOneUser(id);
        res.status(result.code).send({
            data: result.data ,
        });
    },
    getAllDoctors: async (req, res) => {
        const result = await User.getDoctors();
        res.status(result.code).send({
            data: result.data,
        });
    },
    getAllDoctorsWorkHours: async (req, res) => {
        const {start, end} = req.body;
        const result = await User.getWorkHours(start, end);
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await new User(data).updateUser(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    destroy: async (req, res) => {
        const id = req.params.id;
        const result = await  User.deleteUser(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    loginHandler: async (req, res) => {
        console.log("before fetch data");
        const data = req.body;
        console.log("data");
        console.log(data);

        const result = await  User.login(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

    //doctor document
    
    getAllDocument: async (req, res) => {

        const {id} = req.params;
        // const { path } = req.file;
        console.log(req.params);
     //  const type = req.body;
        const result = await DoctorDocument.getAllDocument(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addDocument: async (req, res) => {
        const data = req.body;
        const { path } = req.file;
        const result = await new DoctorDocument(data, path).addDocument();
        res.status(result.code).send({
            data: result.data,
        });
    },

    // doctor aaccommodation document

    checkAllDocumentAccommodation: async (req, res) => {

        const result = await DoctorDocumentAccommodation.getAllDocumentAccommodationCloseToEnd();
        
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllDocumentAccommodation: async (req, res) => {

        const {id} = req.params;
       // const { path } = req.file;
        console.log(req.params);
    //  const type = req.body;
        const result = await DoctorDocumentAccommodation.getAllDocumentAccommodation(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addDocumentAccommodation: async (req, res) => {
        const data = req.body;
        const  path  = req.file.path;
            const result = await new DoctorDocumentAccommodation(data, path).addDocumentAccommodation();
        res.status(result.code).send({
            data: result.data,
        });
    },

   // Absence order

    getAllAbsenceOrders: async (req, res) => {
        const {id} = req.params;

        const result = await AbsenceOrder.getAllAbsenceOrder(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addAbsenceOrder: async (req, res) => {
        console.log(req.body);
        const data = req.body;
        const result = await new AbsenceOrder(data).addAbsenceOrder();
        res.status(result.code).send({
            data: result.data,
        });
    },

    absenceOrderReply: async (req, res) => {
        const data = req.body;
        // const {user_id} = req.params; // should be in the body
        const {manager_id} = req.params;
        data.manager_id = manager_id;
        // data.user_id = user_id;
        const result = await AbsenceOrder.absenceOrderReplyService(data);
        res.status(result.code).send({
            data: result.data,
        });
    },


    // maybe the transaction faild because i do not have any id like this in data

    addDoctorOrder: async (req, res) => {   
        
        const data = req.body;
        const {doctor_id} = req.params;
        // data.setDataValue('doctor_id', doctor_id);
        data.doctor_id = doctor_id;

        // const t = await sequelize.transaction();

        try{
            const result = await sequelize.transaction(async (t) => {
                const result1 = await new DoctorMaterialOrder(data).addOrder({ transaction: t });
                console.log("after first fun in t");
                const result2 = await  Store.order(data, { transaction: t });
                console.log("after second fun in t");
                return { result1, result2 };
            });
            console.log("after retuurn two results");
            res.status(result.result2.code).send({
                data: "order added successfully",
            });

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    },

    addCancelReservation: async (req, res) => {
        // just appointment reservation id
        const data = req.body;
        // const {doctor_id} = req.params;
        // data.doctor_id = doctor_id;

        try{
            const appointmentReservation = await AppointmentReservation.get(data.appointment_reservation_id);
            // console.log(appointmentReservation);
            data.cost = appointmentReservation.data.dataValues.cost;
            data.start = appointmentReservation.data.dataValues.start;
            data.end = appointmentReservation.data.dataValues.end;
            data.done = appointmentReservation.data.dataValues.done;
            data.comment = appointmentReservation.data.dataValues.comment;
            data.appointment_id = appointmentReservation.data.dataValues.appointment_id;
            data.chair_id = appointmentReservation.data.dataValues.chair_id;
            // console.log(appointmentReservation.data.dataValues);
            // appointmentReservation.data.dataValues.setDataValues("appointment_reservation_id", data.appointment_reservation_id);
            // console.log(appointmentReservation.data.dataValues);
            const result = await new DoctorCancelReservation(data).add();
            res.status(result.code).send({
                data: result.data,
            });

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    },

    deleteAppointmentReservation: async (req, res) => {
        const {employee_id} = req.params;
        // just cancel_reservation_id
        const data = req.body;
        data.employee_id = employee_id;

        try{
            const doctorCancelReservation = await DoctorCancelReservation.get(data.cancel_reservation_id);
            // console.log(doctorCancelReservation.data.dataValues.appointment_reservation_id);
            const appointmentReservation = await AppointmentReservation.get(doctorCancelReservation.data.dataValues.appointment_reservation_id);
            // console.log(appointmentReservation);
            const deletedAppointmentReservation = await AppointmentReservation.delete(doctorCancelReservation.data.dataValues.appointment_reservation_id)
            const result = await DoctorCancelReservation.update(data);

            res.status(result.code).send({
                data: "the session has deleted successfully",
            });

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    },

    giveSalary: async (req, res) => {
        const data = req.body;
        const result = await new Salary(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllSalariesForOneMonth: async (req, res) => {
        const data = req.body;
        const result = await Salary.getAllForOneMonth(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

}