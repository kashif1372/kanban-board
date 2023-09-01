import express from "express";
import connectDB from "./dbConfig.js";
import { createTaskController, deleteTaskController, getAllTasksController, getSpecailNameController, setSpecailNameController, updateTaskController, updateTaskControllerOnChange } from "./controller.js";
import path from "path";
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001 ;

// Database Connection 
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,"./client/build")))

// app.get('/',(req,res)=>{
//     res.send("Hello World...!");
// })

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

app.post('/set-special-name',setSpecailNameController);

app.post('/get-special-name',getSpecailNameController);

app.post('/create-task',createTaskController);

app.get('/get-task/:specialName',getAllTasksController);

app.delete('/delete-task/:id',deleteTaskController);

app.put('/update-task/:id',updateTaskController);

app.put('/update-task-on-change/:id',updateTaskControllerOnChange);

app.listen(PORT,()=>{
    console.log(`Server is running on port no. ${PORT}`);
})


