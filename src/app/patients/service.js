const { PatientModel, PatientDocumentModel, AppointmentModel, UserModel } = require('../../app');
const httpStatus = require('../../../utils/constants/httpStatus');
const { Appointment } = require('../appointments/service');


class Patient {

    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.card_id = data.card_id;
        this.phone = data.phone;
        this.gender = data.gender;
        this.birthdate = data.birthdate;
        this.address = data.address;
    }

    async addPatint() {

        try {
            const result = await PatientModel.create(this);
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

    static async getPatints() {

        try {

            const result = await PatientModel.findAll();
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

    static async getPatint(id) {

        try {

            const result = await PatientModel.findByPk(id);

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

    static async getAllPatientsForOneDoctor(doctor_id) {

        try {

            const today = new Date();

            const result = await PatientModel.findAll({
                include: [
                    {
                        attributes: [],
                        model: AppointmentModel,
                        as: "appointments",
                        include: [
                            {
                                model: UserModel,
                                as: "doctor",
                                where: {
                                    id: doctor_id
                                }
                            }
                        ]
                    }
                ]
            });

            for (let i = 0; i < result.length; i++) {
                result[i].age = today.getFullYear() - result[i].birthdate.getFullYear();
                result[i].setDataValue("age", result[i].age)
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

    async update(id) {
        try {
            const result = await PatientModel.update(
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

    static async delete(id) {
        try {
            const result = await PatientModel.destroy({
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

    static async updateDocument(data) {
        try {
            // console.log("كيفك حبيب");
            const patient = await PatientModel.findByPk(data.id);
            patient.document = data.document;
            console.log(patient.document);
            patient.save();
            // const result = await PatientDocumentModel.update(
            //     this,
            //     {
            //         where: {
            //             id: id,
            //         },
            //     }
            // );
            // if (patient.data.dataValues.document = data.document) {
            return {
                data: 'updated',
                code: httpStatus.UPDATED,
            };
            // } else {
            //     return {
            //         data: 'something wrong happene',
            //         code: httpStatus.BAD_REQUEST,
            //     };
            // }
        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    }


}

class PatientDocument {

    constructor(data) {
        this.document = data.file.path;
        this.comment = data.comment;
        this.archived = data.archived;
        this.patient_id = data.patient_id;
    }


    async addDocument() {

        try {

            const result = await PatientDocumentModel.create(this);
            return {
                data: result,
                code: httpStatus.CREATED,
            };


        } catch (error) {
            console.error(error.message);
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }

    }

    static async getPatientDocuments(patient_id) {

        try {


            const result = await PatientModel.findByPk(patient_id, {
                include: [{
                    model: PatientDocumentModel,
                    as: 'patient_documents',

                }],


            });
            return {
                data: result.patient_documents,
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

    static async deleteDocument(id) {
        try {
            const result = await PatientDocumentModel.destroy({
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


}

module.exports = { Patient, PatientDocument };