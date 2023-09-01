import userModel from './model.js'
import userTaskModel from './model2.js'
import JWT from "jsonwebtoken"

const JWT_SECRET = "ADIFBAFAIHEFBIAEFBUIEFBQEI";

export const setSpecailNameController = async (req,res) => {
    try {
        const {name,specialName,email} = req.body;

        // validations

        if(!name){
            return res.send({
                message:"Name is required"
            });
        }
        if(!email){
            return res.send({
                message:"Email is required"
            });
        }
        if(!specialName){
            return res.send({
                message:"Special name is required"
            });
        }
        
        const existingEmail = await userModel.findOne({email});
        
        const existingSpecialName = await userModel.findOne({specialName});

        // checking existing user

        if(existingEmail){
            return res.status(200).send({
                success:false,
                message:"Already have this email !"
            })
        }

        if(existingSpecialName){
            return res.status(200).send({
                success:false,
                message:"Already have this special name !"
            })
        }

        // register user

        const user = await new userModel({name,specialName,email}).save();

        res.status(201).send({
            success:true,
            message:"Special name set successfully",
            user
        })

    } catch (error) {
        console.log(`Error in setting special name ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in setting special name",
            error
        })
        
    }
}





export const getSpecailNameController = async (req,res) =>{
    try {
        const {specialName} = req.body;

        //validation
        if(!specialName){
            return res.status(404).send({
                success:false,
                message:"Special name required"
            })
        }

        //check user
        const user = await userModel.findOne({specialName});

        if(!user){
            return res.status(404).send({
                success:false,
                message:"Special name is not available in the directory"
            })
        }

        const token = await JWT.sign({_id:user._id},JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Perfect match !",
            user:{
                name:user.name,
                email:user.email,
                specialName:user.specialName
            },
            token
        });


    } catch (error) {
        console.log(`Error in getting special name ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in getting special name",
            error
        })
        
    }
}





export const createTaskController = async (req,res) =>{
    try {
        const {title,specialName,desc,column} = req.body;

        if(!title){
            return res.send({
                message:"Title is required"
            });
        }

        const userTask = await new userTaskModel({title,specialName,desc,column}).save();

        res.status(201).send({
            success:true,
            message:"Task created successfully",
            userTask
        })

    } catch (error) {
        console.log(`Error in creating task ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in creating task",
            error
        })
        
    }
}

export const getAllTasksController = async (req,res) =>{
    try {
        const {specialName} = req.params;
        const tasks = await userTaskModel.find({"specialName" : specialName});
        res.status(200).send({
            success:true,
            message:"All Tasks fetched successfully",
            tasks
        });
        
    } catch (error) {
        console.log(`Error in getting all tasks ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in getting all tasks",
            error
        });

    }
}


export const deleteTaskController = async (req,res) =>{
    try {
        const {id} = req.params
        const category = await userTaskModel.findByIdAndDelete(id);

        res.status(201).send({
            success:true,
            message:"task deleted successfully",
            category
        })

        
    } catch (error) {
        console.log(`Error in deleting category ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in deleting category",
            error
        })
    }
}


export const updateTaskController = async (req,res)=>{

    try {
        const {id} = req.params;
        const {title,desc} = req.body;
        await userTaskModel.findByIdAndUpdate(id,{title,desc},{new:true});
        
    } catch (error) {
        console.log(`Error in updating task ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in updating task",
            error
        })
    }
}



export const updateTaskControllerOnChange = async (req,res)=>{

    try {
        const {id} = req.params;
        const {column} = req.body;
        await userTaskModel.findByIdAndUpdate(id,{column},{new:true});
        
    } catch (error) {
        console.log(`Error in updating task on change ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in updating task on change",
            error
        })
    }
}