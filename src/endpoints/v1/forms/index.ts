import { Router } from 'express'

import create from './create'
import all from './all'
import answer from './answer'

const router = Router()

router.post('/create', create)
router.get('/all', all)
router.post('/answer', answer)

export default router
