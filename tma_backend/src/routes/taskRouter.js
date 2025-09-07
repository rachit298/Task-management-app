const express = require("express");
const taskRouter = express.Router();
const {
    viewAllTask,
    viewTask,
    updateTask,
    deleteTask,
    createTask
} = require("../controllers/taskControllers");

//view all tasks
taskRouter.get('/task/all', viewAllTask);

//create task
taskRouter.post('/task/create', createTask);

//update task 
taskRouter.put('/task/update', updateTask);

//view task
taskRouter.get('/task/view', viewTask);

//delete task 
taskRouter.delete('/task/delete', deleteTask);