const musicModel = require('../models/music.model');
const uploadFile = require('../services/storage.service');
const albumModel = require('../models/album.model');

// Upload a music file to external storage and create a music document.
async function uploadMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Music file is required' });
  }

  try {
    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: 'Music uploaded successfully',
      music: {
        id: music.id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't upload music", error });
  }
}

// Create a new album and associate it with an artist and existing music entries.
async function createAlbum(req, res) {
  try {
    const { title, musicIds } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musicIds,
    });

    res.status(201).json({
      message: 'Album created successfully',
      title: album._id,
      artist: album.artist,
      musics: album.musics,
    });
  } catch (err) {
    return res.status(500).json({ message: "Couldn't create album", error: err });
  }
}

// Return all music items with artist username populated.
async function fetchMusics(req, res) {
  const musics = await musicModel.find().populate('artist', 'username');

  res.status(200).json({
    message: 'Musics fetched successfully',
    musics,
  });
}

// Return all albums with artist and music details populated.
async function fetchAlbums(req, res) {
  const albums = await albumModel
    .find()
    .populate('artist', 'username')
    .populate('musics');

  res.status(200).json({
    message: 'Albums fetched successfully',
    albums,
  });
}

module.exports = { uploadMusic, createAlbum, fetchMusics, fetchAlbums };