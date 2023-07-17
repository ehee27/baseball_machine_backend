const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router
  .route('/')
  .get(playerController.getAllPlayers)
  .post(playerController.createNewPlayer)
  .patch(playerController.updatePlayer)
  .delete(playerController.deletePlayer)

module.exports = router
