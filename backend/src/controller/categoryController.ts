import type { Request, Response } from "express";
import { prisma } from "../prisma/lib/prisma.js";

export const addCategory = async(req :Request, res: Response)=>{
    const {userId, userRole} = req.user;
    const {name, description} = req.body;

    if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    if(!name || !description){
        return res.status(400).json({
            success : false,
            message : 'Both fields are required'
        })
    }
    try{
        const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    const data = await prisma.category.create({
        data : {
            name : name,
            description : description
        }
    })
    return res.status(201).json({
        success : true,
        message : 'Category Created'
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
    
}

export const getAllCategories = async(req :Request, res: Response)=>{
    const {userId, userRole} = req.user;
    if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    try{
        const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    const data = await prisma.category.findMany()
    return res.status(201).json({
        success : true,
       data : data
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}

export const editCategory = async(req : Request, res : Response)=>{
    const {userId, userRole} = req.user;
    const {id} = req.params;
    const {name, description} = req.body;
    if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    if(!name || !description){
        return res.status(400).json({
            success : false,
            message : 'Both fields are required'
        })
    }
    try{
        const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    const data = await prisma.category.update({
        data : {
            name : name,
            description : description
        },
        where : {id : Number(id)}
    })
    return res.status(201).json({
        success : true,
        message : `${data?.name} Updated Successfull`,
       data : data
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}

export const deleteCategory = async(req :Request, res: Response)=>{
    const {userId, userRole} = req.user;
    const {id} = req.params;
    if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    try{
        const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    const data = await prisma.category.delete({
        where : {id : Number(id)}
    })
    return res.status(201).json({
        success : true,
        message  : `${data ? data.name + ' Deleted Successfully' : 'Deleted Successfully'}`
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}