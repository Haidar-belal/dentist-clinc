const { httpStatus, console } = require('../../../utils/index');
const {ChairModel, DepartmentModel, RoomModel, AppointmentReservationModel} = require('../index');

class Room {
	constructor(data) {
		this.number = data.number;
		this.department_id = data.department_id;
	}

	async add() {
		try {
			const result = await RoomModel.create(this);
			return { data: result, code: httpStatus.CREATED };
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await RoomModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			const result = await RoomModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
				return {
					data: 'deleted',
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

    static async getAll() {
		try {
			const result = await RoomModel.findAll();
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

    static async get(id) {
		try {
			const result = await RoomModel.findOne({
				where: {
					id: id
				}
			});
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

class Department {
	constructor(data) {
		this.name = data.name;
	}

	async add() {
		try {
			const result = await DepartmentModel.create(this);
			return { data: result, code: httpStatus.CREATED };
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await DepartmentModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	static async delete(id) {
		try {
			const result = await DepartmentModel.destroy({
				where: {
					id: id,
				},
			});
			if (result == 1) {
				return {
					data: 'deleted',
					code: httpStatus.OK,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

    static async getAll() {
		try {
			const result = await DepartmentModel.findAll();
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
	
    static async get(id) {
		try {
			const result = await DepartmentModel.findOne({
				where: {
					id: id
				}
			});
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}

class Chair {
	constructor(data) {
		this.number = data.number;
		this.room_id = data.room_id;
	}

	async add() {
		try {
			const result = await ChairModel.create(this);
			return { data: result, code: httpStatus.CREATED };
		} catch (error) {
			console.error(error);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	async update(id) {
		try {
			const result = await ChairModel.update(this, {
				where: {
					id: id,
				},
			});
			if (result[0] == 1) {
				return {
					data: 'updated',
					code: httpStatus.UPDATED,
				};
			} else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	// delete should be tested
	static async delete(id) {
		try {
            const chairWithFutureReservation = await Chair.get(id);
			console.log(chairWithFutureReservation[`appointment_reservations`]);
			// to check if the chair has future reservations 
            if (chairWithFutureReservation.appointment_reservations && !chairWithFutureReservation.getDataValue('appointment_reservations')[0].start) {
                return {
                    data: "this chair has future appointment reservations",
                    code: httpStatus.Multiple_Choices
                };
            }
			const removedChair = await ChairModel.destroy({
				where: {
					id: id,
				},
			});
			// the result is to make the data looks the same
            // const result = await Chair.get(id);
			if (removedChair == 1) {
				return {
					data: "deleted",
					code: httpStatus.OK,
				};
			} 
			else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

	//to delete chair although it has future appointment reservations (did not finished yet)
	static async deleteAnyWay(id) {
		try {
			const removedChair = await ChairModel.destroy({
				where: {
					id: id,
				},
			});
			if (removedChair == 1) {
				return {
					data: "deleted",
					code: httpStatus.OK,
				};
			} 
			else {
				return {
					data: 'something wrong happened',
					code: httpStatus.BAD_REQUEST,
				};
			}
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}

    static async getAll() {
		try {
			const result = await ChairModel.findAll();
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
	
	// get with appointment_reservation
    static async get(id) {
		try {
			const result = await ChairModel.findOne({
				where: {
					id: id
				},
				include: {
					model: AppointmentReservationModel,
					as: "appointment_reservations",
					order: [["start", "DESC"]]
				}
			});
            return {
                data: result,
                code: httpStatus.OK,
            };
		} catch (error) {
			console.error(error.message);
			return {
				data: error.message,
				code: httpStatus.BAD_REQUEST,
			};
		}
	}
}


module.exports = {
	Chair,
    Department,
    Room
};
