import Customer from '../models/customer.model.js'
import mongoose from "mongoose";

export const createCustomer = async (req, res)=>{
    const customer = req.body; // user will send data from body

    if (!customer.name || !customer.phone) {
        return res.status(400).json({ success:false, message: "Please provide all the details"})
    }

    const newCustomer = new Customer(customer)

    try {
        await newCustomer.save()
        res.status(201).json({ success:true, data: newCustomer})
    } catch (error) {
        console.error("Error in creating customer", error.message)
        res.status(500).json({ success:false, message: "server error"})
    }
}

export const getCustomers = async (req, res)=>{
    try {
        const customers = await Customer.find({})
        return res.status(200).json({ success:true, data: customers})
    } catch (error) {
        console.error("Error in fetching customers", error.message)
        return res.status(500).json({ success:false, message: "server error"})
    }
}

export const updateCustomer = async (req, res)=>{
    const {id} = req.params

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "invalid customer id"})
    }

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, product,{new:true})
        res.status(200).json({ success:true, data: updatedCustomer})
    } catch (error) {
        res.status(500).json({ success:false, message: "Server error"})
    }
}

export const deleteCustomer = async (req, res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "invalid customer id"})
    }

    try {
        await Customer.findByIdAndDelete(id)
        res.status(200).json({ success:true, message: "Customer deleted"})
    } catch (error) {
        console.error("Error in deleting customers", error.message)
        res.status(500).json({ success:false, message: "Server error"})
    }
}