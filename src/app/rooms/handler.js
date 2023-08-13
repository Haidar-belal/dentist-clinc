const {Room, Department, Chair} = require('./service');


module.exports = {


    addRoom: async (req, res) => {
        const data = req.body;

        const result = await new Room(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllRooms: async (req, res) => {

        const result = await Room.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getRoom: async (req, res) => {
        const id = req.params.id;
        const result = await Room.get(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    updateRoom: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const result = await new Room(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyRoom: async (req, res) => {
        const id = req.params.id;
        const result = await  Room.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addDepartment: async (req, res) => {
        const data = req.body;

        const result = await new Department(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllDepartments: async (req, res) => {

        const result = await Department.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getDepartment: async (req, res) => {
        const id = req.params.id;
        const result = await Department.get(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    updateDepartment: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const result = await new Department(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyDepartment: async (req, res) => {
        const id = req.params.id;
        const result = await  Department.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addChair: async (req, res) => {
        const data = req.body;

        const result = await new Chair(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getAllChairs: async (req, res) => {

        const result = await Chair.getAll();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getChair: async (req, res) => {
        const id = req.params.id;
        const result = await Chair.get(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    updateChair: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const result = await new Chair(data).update(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyChair: async (req, res) => {
        const id = req.params.id;
        const result = await  Chair.delete(id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    destroyChairAnyWay: async (req, res) => {
        const id = req.params.id;
        const result = await  Chair.deleteAnyWay(id);
        res.status(result.code).send({
            data: result.data,
        });
    },


}