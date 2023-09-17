const discordBot = require('../../../bot/discord/index');
const config = require('../../../public/json/lvlVipStatus.json')
const LinkDM = require('./../../../models/linkDM.js');

module.exports = {
    updateLvl: function (newLevel, oldLevel, userId) {
        if (newLevel > oldLevel) {
            for (i = oldLevel; i <= newLevel; i++) {
                const functionName = `lvlUp${i}`;
                if (typeof this[functionName] === 'function') {
                    this[functionName](userId);
                }
            }
        } else if (newLevel < oldLevel) {
            for (let i = oldLevel; i > newLevel; i--) {
                const functionName = `lvlDown${i}`;
                if (typeof this[functionName] === 'function') {
                    this[functionName](userId);
                }
            }
        }
    },
    lvlUp1: function (userId) {
        discordBot.addRole(config.discord.idRole, userId);
    },
    lvlUp2: async function (userId) {
        //TODO add custom item
        LinkDM.findOne({ discordId: userId }, (err, doc) => {
            if (err) {
              console.error(err);
              return;
            }
            doc.prefixes.push(config.minecraft.prefics);
            doc.save((err) => {
              if (err) {
                console.error(err);
              }
            });
        });
    },
    lvlUp3: function (userId) {
        discordBot.addRole(config.discord.idRoleNews, userId);
        LinkDM.findOne({ discordId: userId }, (err, doc) => {
            if (err) {
              console.error(err);
              return;
            }
            doc.whitelist.push(config.minecraft.idCreativeServer);
            doc.save((err) => {
              if (err) {
                console.error(err);
              }
            });
        });
    },
    lvlUp4: function (userId) {
        //TODO add craft token
        console.log('lvlUp4');
    },
    lvlDown1: function (userId) {
        discordBot.removeRole(config.discord.idRole, userId);
    },
    lvlDown2: function (userId) {
        //TODO remove custom item
        LinkDM.updateOne(
            { discordId: userId }, 
            { $pull: { prefixes: config.minecraft.prefics } },
            (err) => {
                if (err) {
                  console.error(err);
                }})
    },
    lvlDown3: function (userId) {
        discordBot.removeRole(config.discord.idRoleNews, userId);
        LinkDM.updateOne(
            { discordId: userId }, 
            { $pull: { whitelist: config.minecraft.idCreativeServer } },
            (err) => {
                if (err) {
                  console.error(err);
                }})
    },
    lvlDown4: function (userId) {
        //TODO remove craft token
        console.log('lvlDown4');
    }
}