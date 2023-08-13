const {Appointment, AppointmentReservation} = require('./service');


module.exports = {


    addAppointment: async (req, res) => {
        const data = req.body;

        const result = await new Appointment(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllAppointments: async (req, res) => {

        const result = await Appointment.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllAppointmentsWithPatient: async (req, res) => {

        const result = await Appointment.getAllWithPatient();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAppointment: async (req, res) => {
        const id = req.params.id;
        const result = await Appointment.get(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    updateAppointment: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const result = await new Appointment(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyAppointment: async (req, res) => {
        const id = req.params.id;
        const result = await  Appointment.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addAppointmentReservation: async (req, res) => {
        const data = req.body;
console.log("hellllo");
        const result = await new AppointmentReservation(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllAppointmentReservations: async (req, res) => {
        // console.log("before");
        const result = await AppointmentReservation.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAppointmentReservation: async (req, res) => {
        const id = req.params.id;
        const result = await AppointmentReservation.get(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    updateAppointmentReservation: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const result = await new AppointmentReservation(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyAppointmentReservation: async (req, res) => {
        const id = req.params.id;
        const result = await  AppointmentReservation.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllReservationForOneAppointment: async (req, res) => {
        const appointment_id = req.params.appointment_id;
        const result = await AppointmentReservation.getAppointmentReservations(appointment_id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    searchReservation: async (req, res) => {
        const {
            startDate, 
            endDate, 
            doctor_id, 
            treatmentType, 
            start, 
            end,
        } = req.body;
        const result = await AppointmentReservation.search(startDate, endDate, doctor_id, treatmentType, start, end);
        res.status(result.code).send({
            data: result.data,
        });
    },

    determineCostAndDone: async (req, res) => {
        const {
            done, 
            appointment_reservation_id, 
            cost,
        } = req.body;
        const result = await AppointmentReservation.checkEnded(cost, done, appointment_reservation_id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllFutireReservation: async (req, res) => {
        const {doctor_id} = req.params;
        const result = await AppointmentReservation.getFutureReservation(doctor_id);
        res.status(result.code).send({
            data: result.data,
        });
    },

}