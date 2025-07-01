import { ReviewModel } from "../models/reviewModel.js"

export const createReview = async (req, res) => {
    try{
        const data = new ReviewModel(req.body);
        const saveData = await data.save();
        res.status(200).json({
            msg: "data Saved", 
            saveData
        })

    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}