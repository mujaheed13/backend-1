const express = require("express");
const { TodoModel } = require("../models/todo.model.js");
const todoRouter = express.Router();


todoRouter.get("/", async(req, res)=>{
    const userId = req.body.userId;
    try {
        const todos = await TodoModel.find({userId});
        res.send(todos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

todoRouter.post("/", async(req, res)=>{
    try {
        const todo = new TodoModel(req.body);
        await todo.save();
        res.send("Todo has been added");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


todoRouter.patch("/:id", async(req, res)=>{
    try {
        await TodoModel.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.send("Todo has been updated");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = { todoRouter }