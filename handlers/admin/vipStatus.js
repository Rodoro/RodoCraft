const VipStatus = require('./../../models/vipstatus.js');
const vipStatusTools = require('./../../lib/admin/vipStatus/updateLvl.js');
const configData = require('./../../public/json/lvlVipStatus.json')
const fs = require('fs');

exports.main  = async (req, res) => {
        try {
          const users = await VipStatus.find();
    
          res.render("admin/vipStatus/vipstatus", {users});
        } catch (err) {
          return res.next(err);
        }
}
exports.edit = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await VipStatus.findOne({ userId: userId });

    if (!user) {
      return res.next();
    }

    res.render("admin/vipStatus/vipstatus_edit", {user});
  } catch (err) {
    return res.next(err);
  }
}
exports.add = async (req, res) => {
  try {
    res.render("admin/vipStatus/vipstatus_add");
  } catch (err) {
    return res.next(err);
  }
}
exports.saveEdit = async (req, res) => {
  try {
    const userId = req.params;

    const user = await VipStatus.findOne({ userId: userId.id });

    vipStatusTools.updateLvl(req.body.level, user.lvl, user.userId)

    // Нахождение пользователя по его ID и обновление его данных
    await VipStatus.updateOne(
      { userId: userId.id },
      {
        userName: req.body.name,
        lvl: req.body.level,
        exp: req.body.experience,
        balance: req.body.money,
      }
 );

    res.redirect('/admin/direction/vipstatus/');
  } catch (err) {
    return res.next(err);
  }
}
exports.saveAdd = async (req, res) => {
  try {
    vipStatusTools.updateLvl(req.body.level, 0, req.body.id)
    await VipStatus.create(
      {
        userId: req.body.id,
        userName: req.body.name,
        lvl: req.body.level,
        exp: req.body.experience,
        balance: req.body.money,
      }
 );

    res.redirect('/admin/direction/vipstatus/');
  } catch (err) {
    return res.next(err);
  }
}
exports.delete = async (req, res) => {
  try {
    const userId = req.params;
    const user = await VipStatus.findOne({ userId: userId.id });

    await VipStatus.deleteOne({ userId: userId.id });
    vipStatusTools.updateLvl(0, user.lvl, userId.id)

    res.redirect('/admin/direction/vipstatus/');
  } catch (err) {
    return res.next(err);
  }
}
exports.config = async (req, res) => {
  res.json(configData);
}
exports.setting = async (req, res) => {
  res.render('admin/vipStatus/vipstatus_setting', {configData});
}
exports.saveSetting = async (req, res) => {
  fs.readFile('public/json/lvlVipStatus.json', 'utf8', (err, data) => {
    if (err) {
      return res.next(err);
    }

    try {
      const json = JSON.parse(data);

      json.discord.idRole = req.body.idRole;
      json.discord.idRoleNews = req.body.idRoleNews;
      json.minecraft.prefics = req.body.prefics;
      json.minecraft.idCreativeServer = req.body.idCreativeServer;
      json.craftToken.customItem = req.body.customItem;
      json.craftToken.evredayGive = req.body.evredayGive;

      var lvlBorders = [];
      for (const key in req.body) {
        if (key.startsWith('lvlBorder')) {
          lvlBorders.push(req.body[key]);
        }
      }
      json.lvlBorder = lvlBorders;

      fs.writeFile('public/json/lvlVipStatus.json', JSON.stringify(json, null, 3), 'utf8', (err) => {
        if (err) {
          return res.next(err);
        }
  res.redirect('/admin/direction/vipstatus/');
      })} catch(err) {
      return res.next(err);
    }
  })
}