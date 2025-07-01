import { ProductModel } from "../models/productModel.js"


export const createProduct = async (req, res) => {
    try {
        const data = new ProductModel(req.body);
        const saveData = await data.save();
        res.status(400).json({msg: "data saved", saveData})
    }  catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}