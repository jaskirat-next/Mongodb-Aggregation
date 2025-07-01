import { User } from "../models/userModel.js"

export const createUser = async (req, res) => {
    try{
        const data = new User(req.body);
        const saveData = await data.save();
        res.status(200).json({
            msg: "Data saved",
            saveData
        })
    } catch (err) {
        res.status(500).json({

        })
    }
}