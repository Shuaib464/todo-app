const Todo = require('../models/todo.model')

// define route handler
exports.createTodo = async (req, res) => {
    
    try {
        // extract title, description from req ki body
        const {title} = req.body;
        //create a new Todo and insert in DB
        const todo = await Todo.create({title});
        // send success response if todo created
        if(todo) {
            res.status(200).json(
                {
                    success: true,
                    data: todo,
                    message: 'Entry created successfully'
                }
            )
        }

    } catch (error) {
        // send failure message
        console.log(error);
        res.status(500).json(
            {
                success: false,
                data: 'internal server error',
                message: error.message,
            }
        )
    }

}

// export route handler
// module.exports = createTodo;