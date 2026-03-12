import { Router } from 'express'
import { register, login } from '../controllers/auth.controller'
import classRoutes from './class.routes'

const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router