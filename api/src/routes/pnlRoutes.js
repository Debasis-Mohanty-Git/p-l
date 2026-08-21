const express = require('express');
const router = express.Router();
const pnlController = require('../controllers/pnlController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', pnlController.addPnl);
router.get('/', pnlController.getAllPnl);
router.get('/summary', pnlController.getSummary);
router.put('/:id', pnlController.updatePnl);
router.delete('/:id', pnlController.deletePnl);

module.exports = router;
