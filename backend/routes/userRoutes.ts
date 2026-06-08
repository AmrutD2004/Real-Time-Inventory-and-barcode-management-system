import express, { Router } from 'express'
import { isAuthenticated, login, logout, register } from '../controller/userController.ts'
import { userAuth } from '../middleware/userMiddleware.ts'

const route = Router()

route.post('/user/register', register)
route.post('/user/login', login)
route.post('/user/logout', logout)
route.get('/user/me', userAuth ,isAuthenticated)

export default route