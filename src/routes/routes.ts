import { Router } from 'express'
import { createUser, loginUser } from '../controllers/userController'
import { createProduct, getAllProducts, getProductById } from '../controllers/productController';
import { authenticateToken } from '../middlewares/tokenHandler';
import isAdminMiddleware from '../middlewares/isAdmin';
import { storageMiddleware } from '../middlewares/uploadImage'; 
import { addToUserWallet } from '../services/addJewel'; 
import { redeemProduct } from '../services/redeemProduct';

export const routes = Router();


//Open Routes
routes.post('/user', storageMiddleware.single("image"), createUser)
routes.post('/login', loginUser)

//Private Route
routes.get('/listproducts',authenticateToken, getAllProducts)
routes.get('/product',authenticateToken, getProductById)
routes.post('/redeemProduct', authenticateToken, redeemProduct)


//Private Route - ADMIN
routes.post('/newproduct', authenticateToken, isAdminMiddleware, storageMiddleware.single("image"), createProduct)
routes.post('/addjewel', authenticateToken, isAdminMiddleware, addToUserWallet)

