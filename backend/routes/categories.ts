import express, { Router } from 'express'
import { userAuth } from '../middleware/userMiddleware.ts';
import { addCategory, deleteCategory, editCategory, getAllCategories } from '../controller/categoryController.ts';

const categoryRoutes = Router()

categoryRoutes.post('/category/new', userAuth, addCategory)
categoryRoutes.get('/category/all', userAuth, getAllCategories)
categoryRoutes.put('/category/update/:id', userAuth, editCategory)
categoryRoutes.delete('/category/delete/:id', userAuth, deleteCategory)
export default categoryRoutes;