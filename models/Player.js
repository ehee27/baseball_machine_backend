const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

playerSchema.plugin(AutoIncrement, {
  inc_field: 'player',
  id: 'playerIDs',
  start_seq: 100,
})

module.exports = mongoose.model('Player', playerSchema)
