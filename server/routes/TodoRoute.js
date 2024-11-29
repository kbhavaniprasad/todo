// Express routes for todos (backend)

const express = require('express');
const router = express.Router();
const Todo = require('../modells/Todo.js'); // Import the Todo model

// Add a todo
router.post('/api/todos', async (req, res) => {
    const { text, userId, status } = req.body; // Include status in the request body
    try {
      const todo = new Todo({ text, userId, status: status || 'incomplete' });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Error adding todo' });
    }
  });
  

// Get todos for a specific user
router.get('/api/todos', async (req, res) => {
    const { userId } = req.query;
    try {
        const todos = await Todo.find({ userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// Update a todo by ID
// Update a todo by ID (Handle both text and status update)
router.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, status } = req.body;

    try {
        // Update only the fields that are provided in the request
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { 
                text, 
                status: status || 'incomplete'  // Default status if not provided
            },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Failed to update todo' });
    }
});

  


//Delete a todo by ID
router.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
});


module.exports = router;
