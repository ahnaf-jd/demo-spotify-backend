const express = require('express');
const musicController = require('../controllers/music.controller');
const { authenticateToken, requireRole } = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();

// Protected music routes requiring authentication
router.post('/upload', authenticateToken, requireRole('artist'), upload.single('music'), musicController.uploadMusic);
router.post('/album', authenticateToken, requireRole('artist'), musicController.createAlbum);
router.get('/', authenticateToken, musicController.fetchMusics);
router.get('/albums', authenticateToken, musicController.fetchAlbums);

module.exports = router;