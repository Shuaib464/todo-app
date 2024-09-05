const Todo = require('../models/todo.model')

exports.deleteTodo = async(req, res) => {
    try {
        // extract id from params 
        const id = req.params.id
        // find todo by id and delete it
        const todo = await Todo.findByIdAndDelete({_id: id});
        console.log("deleted todo -: ",todo)
        if(todo) {
            return res.status(200).json(
                {
                    success: true,
                    data: todo,
                    message: 'todo deleted successfully'
                }
            )
        } else{
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                data: "Internal Server error"
            }
        )
    }
}