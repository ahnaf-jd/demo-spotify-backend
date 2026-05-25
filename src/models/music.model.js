const mongoose = require('mongoose');

// Music schema stores uploaded track metadata and external file URI.
const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const musicModel = mongoose.model('music', musicSchema);

module.exports = musicModel;