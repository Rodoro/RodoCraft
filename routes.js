const admin = require('./handlers/admin/index.js')
const express = require('express');

const router = express.Router();

router.get('/admin', admin.main)

router.get('/admin/direction/vipstatus/', admin.vipStatus.main)
router.post('/admin/direction/vipstatus/', admin.vipStatus.main)
router.get('/admin/direction/vipstatus/edit/:id', admin.vipStatus.edit)
router.get('/admin/direction/vipstatus/add', admin.vipStatus.add)
router.post('/admin/direction/vipstatus/edit/:id/save', admin.vipStatus.saveEdit)
router.post('/admin/direction/vipstatus/add/save', admin.vipStatus.saveAdd)
router.get('/admin/direction/vipstatus/delete/:id', admin.vipStatus.delete)
router.get('/admin/direction/vipstatus/config', admin.vipStatus.config)
router.get('/admin/direction/vipstatus/setting', admin.vipStatus.setting)
router.post('/admin/direction/vipstatus/setting/save', admin.vipStatus.saveSetting)

router.get('/admin/direction/linkDM', admin.linkDM.main)
router.post('/admin/direction/linkDM', admin.linkDM.main)
router.get('/admin/direction/linkDM/edit/:id', admin.linkDM.edit)
router.post('/admin/direction/linkDM/edit/:id/save', admin.linkDM.saveEdit)

module.exports = router;