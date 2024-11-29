import mongoose  from "mongoose";
const connectToMongo = async ()=>{
    const res =  await mongoose.connect('mongodb://127.0.0.1:27017/todo-list')
    res && console.log('connected to MongoDB')
}
export default connectToMongo;