const { Router } = require("express");
const Notemodel = require("../models/noteModel");
const authmiddleware = require("../middlewares/authmiddleware");


const noteRouter = Router();

noteRouter.post("/create", authmiddleware, async (req, res) => {
    const { title, description, userid, username } = req.body;
    try {
        let note = new Notemodel({ title, description, userid, username });
        await note.save();
        res.status(200).json({ message: "note created successfully" })

    } catch (error) {
        res.status(400).json({ message: error })
    }

})


noteRouter.get("/allnote", authmiddleware, async (req, res) => {
    const userid = req.body.userid;
    try {
        let note = await Notemodel.find({ userid })
        res.status(200).json({ message: "allnote", note })

    } catch (error) {
        res.status(400).json({ message: error })
    }

})

noteRouter.patch("/update/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;
    try {
         await Notemodel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).json({ message: "note updated successfully" })

    } catch (error) {
        res.status(400).json({ message: error })
    }

})


noteRouter.delete("/delete/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;
    try {
       await Notemodel.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "note deleted successfully" })

    } catch (error) {
        res.status(400).json({ message: error })
    }

})


module.exports = noteRouter;