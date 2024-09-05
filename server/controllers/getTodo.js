const Todo = require('../models/todo.model')

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
                                // .then((data) => console.log("getTodo res -> ",data))
                                // .catch((err) => console.log("getTodo dbfetch error ", err))
        res.status(200).json(
            {
                success: true,
                data: todos,
                message: 'todo fetched successfully',
            }
        )
    } catch (error) {
        console.log('getTodo error ',error);
        res.status(500).json(
            {
                success: false,
                message:error.message,
                data: 'Internal Server error'
            }
        )
        
    }
}


// get todo by id
exports.getTodoById = async (req, res) => {
    try {
        // extract id from req params
        const id = req.params.id;
        // find todo basis on id
        const todo = await Todo.findById({_id: id});
        // if data not found for given id
        if(!todo) {
            return res.status(404).json({
                success: false,
                message:"No Data found for given Id"
            })
        }
        // send res status
        res.status(200).json(
            {
                success: true,
                data: todo,
                message: 'Todo fetched successfully'
            }
        )
    } catch (error) {
        console.log('getTodoById error ', error)
        res.status(500).json(
            {
                success: false,
                data: 'Internal server error',
                message: error.message,
            }
        )
    }
}