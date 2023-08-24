const vipStatus = require("./vipStatus.js");

module.exports = {
    main: (req, res) => {res.render('main');},
    vipStatus: vipStatus,
}   