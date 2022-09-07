const AdminsPanelController = require('../controllers/adminsController/adminPanelController');
const isModerator = require('../middlewares/checkModerator');
const adminsPanelController = new AdminsPanelController();
const router = require('express').Router();

router.post('/create', isModerator, adminsPanelController.createAdmin);
router.post('/login', adminsPanelController.panelLogin);

module.exports = router;
