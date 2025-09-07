const Task = require("../models/task");

//create task
const createTask = async (req, res) => {
    try {
        const { title, description, status, createdAt } = req.body;
        const { _id } = req.user;
        const normalizedStatus = status ? status.toLowerCase() : "pending";
        const task = new Task({
            createdBy: _id,
            title,
            description,
            status: normalizedStatus,
            createdAt
        });
        const newTask = await task.save();
        if (!newTask) {
            throw new Error("Task couldn't be created.");
        }
        res.status(200).json({ task: newTask });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

//view all task
const viewAllTask = async (req, res) => {
    try {
        const { status, page, limit, search } = req.body;
        const { _id } = req.user;
        const pageNum = parseInt(page) || 0;
        const limitNum = parseInt(limit) || 10;
        const offset = pageNum * limitNum;

        const filter = {
            createdBy: _id,
        }

        if (status && status.toLowerCase() !== 'all') {
            filter.status = status
        }

        if (search && search.length > 0) {
            filter["$text"] = {
                ["$search"]: search
            }
        }
        const allTasks = await Task.find(filter).
            skip(offset).
            limit(limitNum);
        res.status(200).json({ allTasks });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

//view one task
const viewTask = async (req, res) => {
    try {
        const { _id } = req.params;
        const task = await Task.findById(_id);
        if (!task) {
            throw new Error("Requested task no longer available.");
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

//update task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
            { ...fieldsToUpdate },
            { runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }
        res.status(200).json({ message: "Task updated successful." });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

//delete task
const deleteTask = async (req, res) => {
    try {
        const { _id } = req.body;
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            throw new Error("Task no longer available to delete.");
        }
        res.status(200).json({ message: "Task deleted successfully." })
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    viewAllTask,
    viewTask,
    updateTask,
    deleteTask,
    createTask
}