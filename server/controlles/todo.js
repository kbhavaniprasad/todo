import todoModel from "../models/todo.js";
export const getTodo = async (req,res)=>{
    try{
        const todo= await todoModel.find();
        res.send(todo);
    }
    catch(err){
        console.log(err);
        res.status(500).send('internal server error')
    }
}
export const saveTodo = async (req,res)=>{
    try{
        const {text} =req.body;
        const data = await todoModel.create({text})
        console.log('Added Successfully')
        res.send(data);
    }
    catch(err){
        console.log('Error')
        res.status(500).send('Internal server error: ' + err.message)
    }
    
}
export const deleteTod = async (req,res)=>{
    try{
        const {_id}= req.body;
        await todoModel.findByIdAndDelete(_id)
        res.status(201).send('deleted successfully')
    }
    catch(err){
        console.log(err)
        res.status(500).send(' internal error')
    }
}
export const updateToDo = async (req, res) => {
    try {
        const { _id, text } = req.body;

        await todoModel.findByIdAndUpdate(_id, { text });
        res.status(201).send("Updated Successfully...");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};