const LinkDM = require('./../../models/linkDM.js');

exports.main = async (req, res) => {
    try {
        const users = await LinkDM.find();
  
        res.render("admin/linkDM/linkDM", {users});
      } catch (err) {
        return res.next(err);
      }
}
exports.edit = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await LinkDM.findOne({ discordId: userId });

    if (!user) {
      return res.next();
    }

    res.render("admin/linkDM/linkDM_edit", {user});
  } catch (err) {
    return res.next(err);
  }
}
exports.saveEdit = async (req, res) => {
  try {
    const userId = req.params;

    const user = await LinkDM.findOne({ discordId: userId.discordId });

    await LinkDM.updateOne(
      { discordId: userId.discordId },
      {
        discordName: req.body.discordName,
        discordId: req.body.discordId,
        minecraftName: req.body.minecraftName,
        age: req.body.age,
        howKnow: req.body.howKnow,
        hasMicrophone: req.body.hasMicrophone,
        notification: req.body.notification,
        whitelist: req.getParameterValues("inputText"),
        prefixes: req.getParameterValues("inputText"),
      }
 );

    res.redirect('/admin/direction/linkDM/');
  } catch (err) {
    return res.next(err);
  }
}