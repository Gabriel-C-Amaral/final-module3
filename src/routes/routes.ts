import { Router } from 'express'
import { createUser, loginUser } from '../controllers/userController'
// import { userRoutes } from '../modules/user/routes/user-routes'

export const routes = Router();

routes.post('/user', createUser)
routes.post('/login', loginUser)
// ROTAS ABERTAS 
//routes.use(hotelRoutes)


// ROTAS FECHADAS
//routes.use(authMiddleware)
// routes.use(userRoutes)
//routes.use(reservationRoutes)
// ...outras entidades