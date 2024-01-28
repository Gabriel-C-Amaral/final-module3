import { Router } from 'express'
import { createUser, loginUser } from '../controllers/userController'
import { createProduct, getAllProducts, getProductById } from '../controllers/productController';
import { authenticateToken } from '../middlewares/tokenHandler';
import isAdminMiddleware from '../middlewares/isAdmin';

export const routes = Router();


//Open Routes
routes.post('/user', createUser)
routes.post('/login', loginUser)

//Private Route
routes.get('/listproducts',authenticateToken, getAllProducts)
routes.get('/product',authenticateToken, getProductById)


//Private Route - ADMIN
routes.post('/newproduct', authenticateToken, isAdminMiddleware, createProduct)

