const { Store, Category, StoreBill, StoreBillMaterial } = require('./service');
const {sequelize} = require('../../../utils/database/config');


module.exports = {

    addItems: async (req, res) => {

        const data = req.body;
        const file = req.file;

        console.log("before transaction");

        const result = await sequelize.transaction(async (t) => {
            console.log("in transaction");
            // check if he send me store_id to edit the item and just add it to related table or add new item
            if (data.store_id == null) {
                const result1 = await new Store(data,file).addItems({transaction: t});
                data.store_id = result1.data.dataValues.id;
                console.log("result1" + result1);
            } else {
                const editMaterialInfo = await Store.increaseQuantity(data, {transaction: t});
            }
            const storeBillMaterial = await new StoreBillMaterial(data).addStoreBillMaterial({transaction: t});

            return { storeBillMaterial };
        });
        console.log("after transaction");
        
        res.status(result.storeBillMaterial.code).send({
            data: result.storeBillMaterial.data,
        });
    },

    getItems: async (req, res) => {

        const result = await Store.getItems();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getItem: async (req, res) => {

        const { id } = req.params;
        const result = await Store.getItemById(id);
        res.status(result.code).send({
            data: result.data,
        });
    },
    getItemsByCategory: async (req, res) => {

        const { ca_id } = req.params;
        const result = await Store.getItemsByCategory(ca_id);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addCategory: async (req, res) => {
        const data = req.body;

        const result = await new Category(data).addCategory();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getCategories: async (req, res) => {

        const result = await Category.getCategories();
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    // orderItem: async (req, res) => {
    //     const data = req.body;
    //     const {doctor_id} = req.params;
    //     data.doctor_id = doctor_id;
    //     const result = await new Store(data).order(data);
    //     res.status(result.code).send({
    //         data: result.data,
    //     });
    // },

    addStoreBillWithMaterials: async (req, res) => {

        const data = req.body;
        const images = req.files;

        try{
            // console.log(data);
            // console.log(images);
            const result = await sequelize.transaction(async (t) => {
                
                const storeBill = await new StoreBill(data).addStoreBill({ transaction: t });
                data.store_bill_id = storeBill.data.dataValues.id;

                const result1 = await StoreBillMaterial.addStoreBillMaterialWithAllChanges(data, images, { transaction: t });
                // data.store_bill_id = result1.id;
                // console.log("after first fun in t");
                // const result2 = await new StoreBillMaterial(data).addStoreBillMaterial({ transaction: t });
                // console.log("after second fun in t");
                return { result1 };
            });
            // console.log("after retuurn two results");
            res.status(result.result1.code).send({
                data: result.result1.data,
            });

        } catch (error) {
            return {
                data: error.message,
                code: httpStatus.BAD_REQUEST,
            };
        }
    },

    
    getAllBillsWithMaterials: async (req, res) => {
        const result = await StoreBill.getAllBillsWithItsMaterials();
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    getAllBillsWithoutMaterials: async (req, res) => {
        const result = await StoreBill.getAllBillsWithoutItsMaterials();
        res.status(result.code).send({
            data: result.data,
        });
    },
    
    storeBillSearch: async (req, res) => {
        // the number is the id of the bill, which is written in the bill paper
        const {number} = req.body;
        const result = await StoreBill.search(number);
        res.status(result.code).send({
            data: result.data,
        });
    },

    addStoreBill: async (req, res) => {
        // the number is the id of the bill, which is written in the bill paper
        const data = req.body;
        const result = await new StoreBill(data).add();
        res.status(result.code).send({
            data: result.data,
        });
    },

    getItemByName: async (req, res) => {

        const {name} = req.body;

        const result = await Store.searchItem(name);
        res.status(result.code).send({
            data: result.data,
        });
    },

    getUnderLimitItem: async (req, res) => {

        const result = await Store.underLimit();
        res.status(result.code).send({
            data: result.data,
        });
    },


}