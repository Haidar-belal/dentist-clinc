const {Patient , PatientDocument} = require('./service');


module.exports = {

    add: async (req, res) => {
        const data = req.body;

        const result = await new Patient(data).addPatint();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAll: async (req, res) => {

        const result = await Patient.getPatints();
        res.status(result.code).send({
            data: result.data,
        });
    },
    get: async (req, res) => {
        const id = req.params.id;
        const result = await Patient.getPatint(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    getAllForOneDoctor: async (req, res) => {
        const {doctor_id} = req.params;
        const result = await Patient.getAllPatientsForOneDoctor(doctor_id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await new Patient(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    destroy: async (req, res) => {
        const id = req.params.id;
        const result = await Patient.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    addDocument : async (req,res)=>{
        const file = req.file;
        const data = req.body;
        data.file = file;

        const result = await new PatientDocument(data).addDocument();
        res.status(result.code).send({
            data: result.data,
        });

    },

    getDocuments : async (req,res)=>{

        const patient_id = req.params.id;

        const result = await PatientDocument.getPatientDocuments(patient_id);
        res.status(result.code).send({
            data: result.data,
        });

    },

    updateDocument: async (req, res) => {
        // id for patient
        const {id} = req.params;
        const data = req.body;
        data.id = id;
        // const patient = await Patient.getPatint(id);
        // const result = await new PatientDocument(data).updateDocument(id);
        const result = await Patient.updateDocument(data);
        res.status(result.code).send({
            data: result.data,
        });
    },

    deleteDocument: async (req, res) => {
        const id = req.params.id;
        const result = await  PatientDocument.deleteDocument(id);
        res.status(result.code).send({
            data: result.data,
        });
    },


}