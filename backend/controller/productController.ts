import { Request, Response } from "express";
import { upload } from "../utils/cloudinaryHelper.ts";
import { prisma } from "../prisma/lib/prisma.ts";
import bwipjs from "bwip-js";
import fs from 'fs'
import { barcode } from "../utils/barcodeUploadHelper.ts";


export const addProduct = async(req : Request , res : Response)=>{
    const {userId, userRole} = req.user;
    const {name, price, category_id} = req.body;
    const file = req.file;
     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    if(!name || !price || !category_id){
        return res.status(400).json({
            success : false,
            message : 'All fields are required!'
        })
    }
    if(!file){
        return res.status(400).json({
            success : false,
            message : 'Attach image also!'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    const prefix = 'PRD'
    const sku = `${prefix}-${name.slice(0,2).toUpperCase()}-${Date.now()}`

    const png = await bwipjs.toBuffer({
        bcid : 'code128',
        text : sku,
        scale : 3, 
        height : 10,
        includetext : true
    })
    const barcodeUrl = await barcode(png, sku)
    const barcodeNo = `${name.slice(0,2).toUpperCase()}-${Date.now()}`
    try{
        const image_url = file?.path;
        const data = await prisma.products.create({
            data : {
                name : name,
                sku : sku,
                barcodeImage : barcodeUrl,
                barcodeNo : barcodeNo,
                category_id : Number(category_id),
                image_url : image_url,
                price : price
            }
        })
        return res.status(201).json({
        success : true,
        message : `${data.name} Product Created`
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }


}

export const getAllProducts = async(req : Request , res : Response)=>{
    const {userId, userRole} = req.user;
    const {skip, take} = req.query;
    if(!skip || !take) return

     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    try{
        const totalProducts = await prisma.products.count()
        const result = await prisma.products.findMany({
            skip : + skip,
            take : + take,
            include : {
                category : true
            }
        })
        return res.status(201).json({
        success : true,
        data : result,
        totalProducts : totalProducts
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }


}

export const getAllProductsOnce = async(req : Request , res : Response)=>{
    const {userId, userRole} = req.user;

     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    try{
        const totalProducts = await prisma.products.count()
        const result = await prisma.products.findMany({
            include : {
                category : true
            }
        })
        return res.status(201).json({
        success : true,
        data : result,
        totalProducts : totalProducts
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }


}

export const editProduct = async(req : Request, res : Response)=>{
    const {userId, userRole} = req.user;
    const {name, sku, price, barcode, category_id} = req.body;
    const {id} = req.params;
     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    if(!name || !price ||  !category_id){
        return res.status(400).json({
            success : false,
            message : 'All fields are required!'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    try{
        const data = await prisma.products.update({
            data : {
                name : name,
                sku : sku,
                barcode : barcode,
                category_id : Number(category_id),
                price : price
            },
            where : {id : Number(id)}
        })
        return res.status(201).json({
        success : true,
        message : `${data.name} Product Updated`
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}

export const deleteProduct = async(req : Request, res : Response)=>{
    const {userId, userRole} = req.user;
    const {id} = req.params;
     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }
    try{
        const data = await prisma.products.delete({
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


export const getProductBySearch = async(req : Request, res :Response)=>{
    const {userId, userRole} = req.user;

    const {search} = req.query;
     if(!userId || !userRole){
        return res.status(401).json({
            success : false,
            message : 'Not Authorized'
        })
    }
    const role = userRole
    if(role !== 'Admin' && role !== 'Operator' && role !== 'Manager'){
        return res.status(403).json({
            success : false,
            message: `Access denied for ${role}`
        })
    }

    try{
        const data = await prisma.products.findUnique({
            where : {sku : String(search)},
            include : {
                category : true,
                stock : {
                    include : {
                        warehouse : true
                    }
                }
            }
        })
        if(!data){
            return res.status(404).json({
            success : false,
            message: `No product found with sku : ${search}`
        })
        }
        return res.status(200).json({
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