const express = require("express");
const taskRouter = express.Router();
const {
    viewAllTask,
    viewTask,
    updateTask,
    deleteTask,
    createTask
} = require("../controllers/taskControllers");
const authMiddleware = require('../middleware/auth');

//view all tasks
taskRouter.get('/task/all', authMiddleware, viewAllTask);

//create task
taskRouter.post('/task/create', authMiddleware, createTask);

//update task 
taskRouter.put('/task/update', authMiddleware, updateTask);

//view task
taskRouter.get('/task/view', authMiddleware, viewTask);

//delete task 
taskRouter.delete('/task/delete', authMiddleware, deleteTask);