import { userModel } from "../persistencia/models/user.model.js";

export default class userManager{
    
    async find(){
        try {
            const user = await userModel.find()
            return user
        } catch (error) {
            return error   
        }
    }
    async findOne(obj){
        try {
            const user = await userModel.findOne(obj)
            return user
        } catch (error) {
            return error   
        }
    }
    async findById(id){
        try {
            const user = await userModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }  
    async findAllOrderByLastName(bus,filter){
        try {     
            const user = await userModel.find(bus,filter).sort({last_name: 1})           
            return user
        } catch (error) {
            return error
        }
    }
    async create(obj){
        try {
            const newUser = await userModel.create(obj)   
            return newUser     
        } catch (error) {
            return error
        }
    }
    async updateOne(id, obj) {
        try {
          const updateUser = await userModel.updateOne({ _id: id }, { $set: obj })
          return updateUser
        } catch (error) {
          return error
        }
      }
    async deleteOne(id) {
        try {
          const deleteUser = await userModel.deleteOne({ _id: id })
          return deleteUser
        } catch (error) {
          return error
        }
      }
      async deleteMany(obj){
        try {
            deleteAllUser = await userModel.deleteMany(obj)
            return deleteAllUser
        } catch (error) {
            return error
        }
      }
}