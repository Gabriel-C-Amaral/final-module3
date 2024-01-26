import { Router } from 'express'
import { createUser, loginUser } from '../controllers/userController'
import { createProduct, getAllProducts, getProductById } from '../controllers/productController';


export const routes = Router();

routes.post('/user', createUser)
routes.post('/login', loginUser)
routes.post('/newproduct', createProduct)
routes.get('/listproducts', getAllProducts)
routes.get('/product', getProductById)
// ROTAS ABERTAS 
//routes.use(hotelRoutes)


// ROTAS FECHADAS
//routes.use(authMiddleware)
// routes.use(userRoutes)
//routes.use(reservationRoutes)
// ...outras entidades