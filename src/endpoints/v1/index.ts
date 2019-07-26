import { Router } from 'express'

import UsersRouter from './users'
import FormsRouter from './forms'

const router = Router()

router.use('/users', UsersRouter)
router.use('/forms', FormsRouter)

export default router
