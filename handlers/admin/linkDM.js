const LinkDM = require('./../../models/linkDM.js');

exports.main = async (req, res) => {
    try {
        const users = await LinkDM.find();
  
        res.render("admin/linkDM/linkDM", {users});
      } catch (err) {
        return res.next(err);
      }
}