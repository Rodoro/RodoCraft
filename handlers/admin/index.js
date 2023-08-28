const vipStatus = require("./vipStatus.js");
const linkDM = require("./linkDM.js");

module.exports = {
    main: (req, res) => {res.render('admin/main');},
    vipStatus: vipStatus,
    linkDM: linkDM,
}   