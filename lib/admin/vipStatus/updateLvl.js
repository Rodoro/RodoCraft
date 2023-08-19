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
        console.log('lvlUp1');
    },
    lvlUp2: function (userId) {
        console.log('lvlUp2');
    },
    lvlUp3: function (userId) {
        console.log('lvlUp3');
    },
    lvlUp4: function (userId) {
        console.log('lvlUp4');
    },
    lvlDown1: function (userId) {
        console.log('lvlDown1');
    },
    lvlDown2: function (userId) {
        console.log('lvlDown2');
    },
    lvlDown3: function (userId) {
        console.log('lvlDown3');
    },
    lvlDown4: function (userId) {
        console.log('lvlDown4');
    }
}