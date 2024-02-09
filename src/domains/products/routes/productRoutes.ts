import { Router } from 'express'
// import productController from '../controller/productController'
const productController = require('../controller/productController')
import { authenticateToken } from '../../../middlewares/tokenHandler'
import isAdminMiddleware from '../../../middlewares/isAdmin'
import { storageMiddleware } from '../../../middlewares/uploadImage'
import { createProduct } from '../repository/productRepository'
import { Request, Response } from 'express'

export const productRoutes = Router()

// productRoutes.post('/newproduct', authenticateToken, isAdminMiddleware, storageMiddleware.single("image"), (req: Request, res: Response) => {productController.newProduct(req, res)})
// productRoutes.post('/newproduct', authenticateToken, isAdminMiddleware, storageMiddleware.single("image"),  (req: Request, res: Response) => { console.log(req.file)})
productRoutes.post('/newproduct', authenticateToken, isAdminMiddleware, storageMiddleware.single("image"),  productController.newProduct)
