const express = require('express');
const router = express.Router();
const {
  addPnl,
  getAllPnl,
  getSummary,
  updatePnl,
  deletePnl
} = require('../controllers/pnlController');

router.post('/', addPnl);
router.get('/', getAllPnl);
router.get('/summary', getSummary);
router.put('/:id', updatePnl);
router.delete('/:id', deletePnl);

module.exports = router;
