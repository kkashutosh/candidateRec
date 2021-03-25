const express = require("express")
const  registerController  = require('../controller/candidate.controller')
const router =  express.Router()

router.use(express.json())

router.post('/candidate', registerController.createCandidate)
router.get('/candidate',registerController.readCandidate)
router.patch('/candidate/:id',registerController.updateCandidate)
router.delete('/candidate/:id',registerController.deleteCandidate)

module.exports = router