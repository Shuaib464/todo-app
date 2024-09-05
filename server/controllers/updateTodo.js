const Todo = require('../models/todo.model')

exports.updateTodo = async (req, res) => {
    try {
        // extract todo id from params
        const id = req.params.id;
        // extract title-desc from req body
        const {title, description} = req.body;

        // find todo by id and update in db
        const updatedTodo = await Todo.findByIdAndUpdate(
                                            id,
                                            {title, description, updatedAt: Date.now()},
                                            {new : true}
        )
        if (!updatedTodo) {
            console.log('updateTodo :: error ::')
            return  res.status(401).json(
                {
                    success: false,
                    message: 'updateTodo error'
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                data: updatedTodo,
                message: 'Todo updated successfully',
            }
        )
    } catch (error) {
        console.log('UpdateTodo error ', error)
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                data: 'Internal Server error'
            }
        )
    }
}