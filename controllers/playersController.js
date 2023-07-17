const Player = require('../models/Player')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getAllPlayers = asyncHandler(async (req, res) => {
  // We'll get all notes but drill down farther to also get user data
  const players = await Player.find().lean() // lean calls just the json we need - no extea methods
  if (!players?.length) {
    return res.status(400).json({ message: 'No players found twoSeven' })
  }
  // mark each player with it's user - we're grabbing the UserId from the player Model attributes - map through the players, find a user with the ID and return a spread object.
  const playersWithUser = await Promise.all(
    players.map(async player => {
      const user = await User.findById(player.user).lean().exec() // returns a promise that will execute efficiently
      return { ...player, username: user.username }
    })
  )
  // return the specific players with user data
  res.json(playersWithUser)
})

//------------------- CREATE NEW---------------------------------------
const createNewPlayer = asyncHandler(async (req, res) => {
  const { user, fullName, position, number } = req.body
  console.log('This is the payload...', req.body)

  if (!user || !fullName || !position || !number) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  // const duplicate = await Player.findOne({ fullName }).lean().exec()
  const duplicate = await Player.findOne({ fullName })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec()
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate player fullName' })
  }
  // testing by setting a playerObject with payload
  const playerObject = { user, fullName, position, number }

  const player = await Player.create(playerObject)
  if (player) {
    return res.status(201).json({ message: 'New player created' })
  } else {
    return res.status(400).json({ message: 'Invalid player data received' })
  }
})

//------------------- UPDATE ---------------------------------------
const updatePlayer = asyncHandler(async (req, res) => {
  const { id, user, fullName, position, number } = req.body

  if (!user || !fullName || !position || !number) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  const player = await Player.findById(id).lean().exec()
  if (!player) {
    return res.status(400).json({ message: 'Player not found' })
  }
  // Check for duplicate full name
  // const duplicate = await Player.findOne({ fullName }).lean().exec()
  const duplicate = await Player.findOne({ fullName })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec()
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate player fullName' })
  }
  player.user = user
  player.fullName = fullName
  player.number = number
  player.active = true

  const updatedPlayer = await player.save()
  res.json(`'${updatedPlayer.position}' updated`)
})

//------------------- DELETE ---------------------------------------
const deletePlayer = asyncHandler(async (req, res) => {
  const { id } = req.body
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Player ID required' })
  }
  // Confirm player exists to delete
  const player = await Player.findById(id).exec()
  if (!player) {
    return res.status(400).json({ message: 'Player not found' })
  }
  const result = await player.deleteOne()
  const reply = `Player '${result.fullName}' with ID ${result._id} deleted`
  res.json(reply)
})

module.exports = {
  getAllPlayers,
  createNewPlayer,
  updatePlayer,
  deletePlayer,
}
