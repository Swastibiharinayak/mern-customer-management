import express from "express";
import { deleteCustomer, getCustomers, createCustomer, updateCustomer } from "../controllers/customers.controller.js";

const router = express.Router();

router.post("/", createCustomer)
router.get("/", getCustomers)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)


export default router;