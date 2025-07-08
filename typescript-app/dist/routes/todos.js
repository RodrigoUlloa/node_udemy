"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ message: 'Update todo', todos: todos });
        return;
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});
//this route dont work well
router.delete('todo/todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== (params.todoId));
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
