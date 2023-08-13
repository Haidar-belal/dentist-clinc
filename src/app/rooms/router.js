const {
	addRoom,
    getRoom,
    getAllRooms,
    updateRoom,
    destroyRoom,
	addDepartment,
    getDepartment,
    getAllDepartments,
    updateDepartment,
    destroyDepartment,
	addChair,
    getChair,
    getAllChairs,
    updateChair,
    destroyChair,
    destroyChairAnyWay,
} = require('./handler');
const router = require('express').Router();

// Room

router.post('/', addRoom);

router.get('/:id', getRoom);

router.get('/', getAllRooms);

router.put('/:id', updateRoom);

router.delete('/:id', destroyRoom);

// Department

router.post('/department', addDepartment);

router.get('/department/:id', getDepartment);

router.get('/departments/getAll', getAllDepartments);

router.put('/department/:id', updateDepartment);

router.delete('/department/:id', destroyDepartment);

// Chair

router.post('/chair', addChair);

router.get('/chair/:id', getChair);

router.get('/chairs/getAll', getAllChairs);

router.put('/chair/:id', updateChair);

router.delete('/chair/:id', destroyChair);

router.delete('/chair/force-delete/:id', destroyChairAnyWay);

module.exports = router;
