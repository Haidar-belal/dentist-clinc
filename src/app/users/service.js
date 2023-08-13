const { UserModel, DoctorDocumentModel, DoctorAccommodationModel, AbsenceOrderModel, DoctorMaterialOrderModel, DoctorCancelReservationModel, AppointmentReservationModel, AppointmentModel, SalaryModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Op } = require('sequelize');
const { AppointmentReservation } = require('../appointments/service');




class User {

    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.card_id = data.card_id;
        this.email = data.email;
        this.password = data.password;
        this.phone = data.phone;
        this.city = data.city;
        this.region = data.region;
        this.street = data.street;
        this.near_by = data.near_by;
        this.birthdate = data.birthdate;
        this.gender = data.gender;
        this.deserve = data.deserve;
        this.type = data.type;
        this.manager_id = data.manager_id;
    }
    static async getAllUsers() {
        try {
                let result = await UserModel.findAll();
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    static async getAllManager() {
        try {
                let result = await UserModel.findAll({
                    where: {
                        type: {
                            [Op.eq]: "Manager",
                        }
                    }
                });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    static async getDoctors() {
        try {
                let result = await UserModel.findAll({
                    where: {
                        type: {
                            [Op.eq]: "Doctor",
                        }
                    }
                });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    static async getWorkHours(start, end) {
        try {
            let doctorsWithWorkHours = [];
            let oneDoctorWorkHours = 0;
            let doctor = {};
            // let workHours = {};
            let number_of_sessions = 0;

            let result = await UserModel.findAll({
                where: {
                    type: {
                        [Op.eq]: "Doctor",
                    }
                },
                include: [
                    {
                        model: AppointmentModel,
                        as: 'doctor_appointments',
                        include: [
                            {
                                model: AppointmentReservationModel,
                                as: 'appointment_reservations',
                                where: {
                                    start: {
                                        [Op.and]: [
                                            {[Op.gte]: start},
                                            {[Op.lte]: end}
                                        ]
                                    },
                                    done: {
                                        [Op.ne]: null
                                    }
                                }
                            }
                        ]
                    }
                ]
            });

            for(let i = 0; i < result.length; i++) {
                for(let j = 0; j < result[i].doctor_appointments.length; j++) {
                    for(let k = 0; k < result[i].doctor_appointments[j].appointment_reservations.length; k++) {
                        oneDoctorWorkHours += result[i].doctor_appointments[j].appointment_reservations[k].done - result[i].doctor_appointments[j].appointment_reservations[k].start;
                        number_of_sessions += 1
                    }
                }

                doctor.doctor_info = result[i];
                doctor.workHours = {}
                doctor.workHours.minutes = oneDoctorWorkHours / 60000;
                doctor.workHours.hours = oneDoctorWorkHours / 3600000 - doctor.workHours.minutes / 60;
                doctor.number_of_sessions = number_of_sessions;
                doctorsWithWorkHours.push(doctor);
                doctor = {};
                oneDoctorWorkHours = 0;
                number_of_sessions = 0;
            }

            return {
                data: doctorsWithWorkHours,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }


    async addUser() {

        try {
            console.log("before");
            const result = await UserModel.create(this);
            console.log("after");
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }

    static async getOneUser(id) {

        try {
            // let result;
            let result = await UserModel.findByPk(id);
            if (result.type == "Doctor") {
                // result = await UserModel.findByPk(id, {
                //     include: [
                //         {
                //             model: DoctorDocumentModel,
                //             as: 'doctor_documents',
                //         },
                //     ],
                // });
                let documents = await DoctorDocumentModel.findAll({
                    where: {
                        doctor_id: id
                    }
                });
                result.setDataValue('doctor_documents', documents);
            } 
            // else {
            // let result = await UserModel.findByPk(id);
            // }


            // token = result.generateToken();
            // console.log(token);
            if (result === null) {
                return {
                    data: "NOT FOUND",
                    code: httpStatus.NOT_FOUND,
                };
            }
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }


    async updateUser(id) {
        try {
            const result = await UserModel.update(
                this,
                {
                    where: {
                        id: id,
                    },
                }
            );
            // console.warn(result[0]);
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
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async deleteUser(id) {
        try {
            const result = await UserModel.destroy({
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

    static async login(data) {
        console.log(data);
        try {
            const result = await UserModel.findOne(
                {
                    where: {
                        email: data.email
                    }
                }
            );
            // console.log(result);
            if (result === null) {
                return {
                    data: 'there is no user with this email',
                    code: httpStatus.VALIDATION_ERROR,
                }

            }
            if (result.password != data.password) {
                return {
                    data: 'the password is not correct',
                    code: httpStatus.VALIDATION_ERROR,
                }
            }
            // console.log('dddddddddddddddddd');
            console.log(result.shit());
            const token = result.generateToken();
            // console.log('ffffffffffffff');
            console.log(token);
            return {
                data: { result: result, token: token },
                code: httpStatus.CREATED,
            };
        }
        catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }

}


class DoctorDocument {

    constructor(data, path) {
        this.comment = data.comment;
        this.document = path;
        this.doctor_id = data.doctor_id;
    }

    static async getAllDocument(id) {

        try {

            const result = await DoctorDocumentModel.findAll({
                where: {
                    doctor_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addDocument() {

        try {

            const result = await DoctorDocumentModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }


}


class DoctorDocumentAccommodation {

    constructor(data, path) {
        this.end_date = data.end_date;
        this.document = path;
        this.doctor_id = data.doctor_id;
    }

    static async getAllDocumentAccommodation(id) {

        try {

            const result = await DoctorAccommodationModel.findAll({
                where: {
                    doctor_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    static async getAllDocumentAccommodationCloseToEnd() {

        try {

            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

            const result = await DoctorAccommodationModel.findAll({
                where: {
                    end_date: {
                        [Op.lte]: thirtyDaysFromNow
                    }
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addDocumentAccommodation() {

        try {

            const result = await DoctorAccommodationModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }


}

class AbsenceOrder {

    constructor(data, path) {
        this.accepted = data.accepted;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.user_id = data.user_id;
    }

    static async getAllAbsenceOrder(id) {

        try {

            const result = await AbsenceOrderModel.findAll({
                where: {
                    user_id: id
                }
            });
            return {
                data: result,
                code: httpStatus.OK,
            };

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    async addAbsenceOrder() {

        try {

            const result = await AbsenceOrderModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }

    static async absenceOrderReplyService(data) {

        try {
            let resultMessage = "";
            const result = await AbsenceOrderModel.findOne({
                where: {
                    user_id: data.user_id,
                    accepted: null
                }
            });
            // console.log(result);
            result.accepted = data.accepted;
            result.save();
            data.start_date = result.start_date;
            data.end_date = result.end_date;
            if (result.accepted === true) {
                resultMessage = "absence order accepted successfully";
                // if (result.type == "Doctor") {
                    const reservations = await AppointmentReservation.getDoctorReservations(data.user_id, data.start_date, data.end_date);
                    // console.log(reservations.data.length);
                    for (let i = 0; i < reservations.data.length; i++) {
                        data.start = reservations.data[i].dataValues.start;
                        data.end = reservations.data[i].dataValues.end;
                        data.cost = reservations.data[i].dataValues.cost;
                        data.done = reservations.data[i].dataValues.done;
                        data.comment = reservations.data[i].dataValues.comment;
                        data.appointment_id = reservations.data[i].dataValues.appointment_id;
                        data.appointment_reservation_id = reservations.data[i].dataValues.id;
                        data.chair_id = reservations.data[i].dataValues.chair_id;
                        data.employee_id = data.manager_id;
                        console.log("just ended");
                        const doctorCancelResevation = await new DoctorCancelReservation(data).add();
                    }
                // }
            } else {
                resultMessage = "absence order rejected successfully";
            }
            
            return {
                data: resultMessage,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.ALREADY_REGISTERED,
            };
        }
    }


}


class DoctorMaterialOrder {

    constructor(data) {
        this.doctor_id = data.doctor_id;
        this.store_id = data.store_id;
        this.quantity = data.quantity;
    }

    async addOrder() {

        try {

            const result = await DoctorMaterialOrderModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }


}


class DoctorCancelReservation {

	constructor(data) {
		this.cost = data.cost;
		this.start = data.start;
		this.end = data.end;
		this.done = data.done;
		this.comment = data.comment;
		this.appointment_id = data.appointment_id;
		this.chair_id = data.chair_id;
		this.employee_id = data.employee_id;
		this.appointment_reservation_id = data.appointment_reservation_id;
		
	}

    // this.doctor_id = data.doctor_id;

    async add() {

        try {

            const result = await DoctorCancelReservationModel.create(this);
            console.log(result);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async update(data) {
        // to add employee_id

        try {

            const doctorCancelReservation = await DoctorCancelReservationModel.findOne({
				where: {
					id: data.cancel_reservation_id
				},
			});

            doctorCancelReservation.employee_id = data.employee_id;
            doctorCancelReservation.save();

            // const result = await DoctorCancelReservationModel.update(this, {
            //     where: {
            //         id: id
            //     }
            // });
            return {
                data: doctorCancelReservation,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async get(id) {
		try {
			const result = await DoctorCancelReservationModel.findOne({
				where: {
					id: id
				},
			});   
			return {
				data: result,
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


}

class Salary {

	constructor(data) {
		this.amount = data.amount;
		this.date = data.date;
		this.employee_id = data.employee_id;
		
	}

    async add() {

        try {

            const result = await SalaryModel.create(this);
            // console.log(result);
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

    static async getAllForOneMonth(data) {

        try {

            const result = await SalaryModel.findAll({
                where: {
                    date: data.date
                },
                include: {
                    model: UserModel,
                    as: "employee"
                }
            });
            return {
                data: result,
                code: httpStatus.CREATED,
            };
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }

}


module.exports = { User, DoctorDocument, DoctorDocumentAccommodation, AbsenceOrder, DoctorMaterialOrder, DoctorCancelReservation, Salary };  