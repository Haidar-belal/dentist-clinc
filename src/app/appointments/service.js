// const { where } = require('sequelize');
const { httpStatus, console } = require('../../../utils/index');
const {AppointmentModel, AppointmentReservationModel, PatientDocumentModel, PatientModel, UserModel, ChairModel} = require('../index');
const {Op} = require('sequelize');

class Appointment {
	constructor(data) {
		this.title = data.title;
		this.status = data.status;
		this.patient_id = data.patient_id;
		this.doctor_id = data.doctor_id;
		this.employee_id = data.employee_id;
	}

	async add() {
		try {
			const result = await AppointmentModel.create(this);
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
			const result = await AppointmentModel.update(this, {
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

	static async editStatus(result) {
		try {
			// console.log(result);
			let status = "still paying";
			const paid = result.data.dataValues.paid;
			const total = result.data.dataValues.total;
			const appointment_id = result.data.dataValues.appointment_id;

			// if (paid === total) {
			// 	status = "paid";
			// }

			const appointment = await AppointmentModel.findByPk(appointment_id);

			if (paid === total && appointment.finished === true) {
				status = "paid";
			}

			appointment.status = status;
			appointment.save();
			// console.log();
			return {
				data: 'updated',
				code: httpStatus.UPDATED,
			};
			
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
			const result = await AppointmentModel.destroy({
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
			const result = await AppointmentModel.findAll();
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

    static async getAllWithPatient() {
		try {
			const result = await AppointmentModel.findAll({
				include: [
					{
						model: PatientModel,
						as: 'patient'
					}, 
					{
						model: UserModel,
						as: 'doctor'
					}, 
					{
						model: UserModel,
						as: 'employee'
					}, 
				]
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
	
    static async get(id) {
		try {
			const result = await AppointmentModel.findOne({
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

class AppointmentReservation {
	constructor(data) {
		this.cost = data.cost;
		this.start = data.start;
		this.end = data.end;
		this.done = data.done;
		this.comment = data.comment;
		this.appointment_id = data.appointment_id;
		this.chair_id = data.chair_id;
	}

	async add() {
		try {
			const result = await AppointmentReservationModel.create(this);
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
			const result = await AppointmentReservationModel.update(this, {
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
			const removedReservation = await AppointmentReservationModel.destroy({
				where: {
					id: id,
				},
			});
			if (removedReservation == 1) {
				return {
					data: 'deleted',
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
			const result = await AppointmentReservationModel.findAll();
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
			const result = await AppointmentReservationModel.findOne({
				where: {
					id: id
				},
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

    static async getAppointmentReservations(id) {
		try {
			const result = await AppointmentReservationModel.findAll({
				where: {
					appointment_id: id
				},
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

	// i should be carful with full empty days and the start working time if the first session is in the middle of the day
	// i should open a socket for choosing the doctor

	// if the doctor does not has appointmnet reservation or reservatoin //important ///////////////////////////////////////////////////
	// add between condition to appointment reservation //important ///////////////////////////////////////////////////
	static async search(startDate, endDate, doctor_id, treatmentType, start, end) {
		try {

			let startDateObj = new Date(startDate);
			let endDateObj = new Date(endDate);
			// let result = [];
			const doctors = await UserModel.findAll({
				// where: {
				// 	type: "Doctor"
				// },
				// include: [
				// 	{
				// 		required: true,
				// 		model: AppointmentModel,
				// 		as: 'doctor_appointments',
				// 		include: [
				// 			{
				// 				required: true,
				// 				model: AppointmentReservationModel,
				// 				as: 'appointment_reservations',
				// 				include: [
				// 					{
				// 						model: ChairModel,
				// 						as: 'chair'
				// 					}
				// 				]
				// 			}
				// 		]
				// 	}
				// ]
			});
			console.log("doctors");
			console.log(doctors);

			// chairs have no reservations
			const chairs = await ChairModel.findAll({
				include: [
					{
						required: true,
						model: AppointmentReservationModel,
						as: 'appointment_reservations',
					}
				]
			});

			console.log(chairs);

			let emptyDates = [];
			let doctorEmptyDates = [];
			let date = {};
			let doctor = {};
			let chair_ids = [];
			let chairsDates = [];
			// let temp = 0;
			// let appointments;
			// let reservation;
			while (startDateObj.getDay() <= endDateObj.getDay()) {
				for (let i = 0; i < doctors[i].length; i++) {
					for (let j = 0; j < doctors[i].appointments.length; j++) {
						const result = doctors[i].appointments[j].appointment_reservations.filter(obj => obj.start.getDay() === startDateObj.getDay());
						doctors[i].appointments[j].appointment_reservations.push({start: start, end: end});
						doctors[i].appointments[j].appointment_reservations.sort((a, b) => a.start - b.start);
						for (let k = 0; k < doctors[i].appointments[j].appointment_reservations.length; k++) {
							if ((doctors[i].appointments[j].appointment_reservations[k + 1].start.getTime() - doctors[i].appointments[j].appointment_reservations[k].end.getTime() ) > 0) {
								date.start = doctors[i].appointments[j].appointment_reservations[k].end;
								date.end = doctors[i].appointments[j].appointment_reservations[k + 1].start;
								doctorEmptyDates.push(date);
							}
						}
					}
					doctor.doctor_info = doctors[i];
					doctor.doctorEmptyDates = doctorEmptyDates;
					emptyDates.push(doctor);
					doctorEmptyDates = [];
					doctor = {};
				}
				startDateObj.setDate(startDateObj.getDay() + 1);
			}
			
            return {
                data: doctors,
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

	static async getFutureReservation(doctor_id) {
		try {
			const today = new Date();
			const futureReservation = await AppointmentReservationModel.findAll({
				where: {
					start: {
						[Op.gte]: today
					}
				},
				include: [
					{
						model: ChairModel,
						as: 'chair'
					},{
						required: true,
						model: AppointmentModel,
						as: 'appointment',
						include: [
							{
								required: true,
								model: UserModel,
								as: "doctor",
								where: {
									id: doctor_id
								}
							},{
								model: PatientModel,
								as: 'patient',
								include: [
									{
										model: PatientDocumentModel,
										as: "patient_documents"
									}
								]
							}
						]
					}
				],
				sort: [["startDate"]],
			});
            return {
                data: futureReservation,
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

	static async checkEnded(cost, done, appointment_reservation_id) {
		try {
			const now = new Date();
			let appointmentReservation = await AppointmentReservationModel.findByPk(appointment_reservation_id);

			if (cost) {
				appointmentReservation.cost = cost;
			}

			if (done) {
				appointmentReservation.done = done;
			} else {
				appointmentReservation.done = now;
			}

			appointmentReservation.save();

            return {
                data: "updated",
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

	static async getDoctorReservations(doctor_id, start_date, end_date) {
		try {
			const start = new Date(start_date);
			const end = new Date(end_date);
			// console.log(start_date);
			// console.log(end);
			const futureReservation = await AppointmentReservationModel.findAll({
				where: {
					start: {
						[Op.and]: [
							{[Op.gte]: start},
							{[Op.lt]: end}
						]
					}
				},
				include: [
					{
						model: ChairModel,
						as: 'chair'
					},{
						required: true,
						model: AppointmentModel,
						as: 'appointment',
						include: [
							{
								required: true,
								model: UserModel,
								as: "doctor",
								where: {
									id: doctor_id
								}
							},
						]
					}
				],
				sort: [["start"]],
			});
			console.log("futureReservation" + futureReservation);
            return {
                data: futureReservation,
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
	Appointment,
    AppointmentReservation
};
