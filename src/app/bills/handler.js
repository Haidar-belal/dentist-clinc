const  {Bill, Payer, Tax, PayedTax}  = require('./service');
const  {Appointment}  = require('../appointments/service');


module.exports = {

    get: async (req, res) => {
        const id = req.params.id;
        const result = await Bill.getPatientBill(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllForPdf: async (req, res) => {
        // const id = req.params.id;
        const result = await Bill.getAllPatientsBillsForPdf();
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    getAllPatientBills: async (req, res) => {
        const result = await Bill.getAllPatientsBills();
        res.status(result.code).send({
            data: result.data,
        });
    },

    addBill: async (req, res) => {
        // const {employee_id} = req.params;
        // here send rest from get patient bill api then send it as total and send what the paient has payed and employee_id//////// important
        const data = req.body;
        // data.employee_id = employee_id;
        const payer = await new Payer(data).add(data);
        console.log("payer");
        console.log(payer.data);
        data.payer_id = payer.data.dataValues.id;
        const currentTaxVar = await Tax.currentTax();
        // console.log(currentTaxVar);
        data.tax_id = currentTaxVar.data.dataValues.id;
        const result = await new Bill(data).add();
        const newAppointmentStatus = await Appointment.editStatus(result);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addPayer: async (req, res) => {
        const data = req.body;
        const result = await new Payer(data).add(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addTax: async (req, res) => {
        const data = req.body;
        const result = await new Tax(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllPayedTax: async (req, res) => {
        const result = await PayedTax.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    addPayedTax: async (req, res) => {
        const data = req.body;
        const result = await new PayedTax(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllTaxOnbills: async (req, res) => {
        const data = req.body;
        const result = await Bill.getTotalForOneYear(data);
        res.status(result.code).send({
            data: result.data,
        });
    },


}