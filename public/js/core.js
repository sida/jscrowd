'use strict';

let ST = {
    DIR: {},
    core: {},
    generator: {},
};

ST.DIR = Object.freeze({
    UNKNOWN: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
});

ST.COMMAND = Object.freeze({
    INTERVAL: 1,
    STOP: 2,
    START: 3,
    ASSEMBLE: 4,
});

ST.core = (() => {
    let charList = new Set();
    let timerId = null;

    let _sendMessage = (commande, param) => {
        const message = Object.freeze([commande,param]);
        charList.forEach((obj) => {
            obj.message(message);
        });
    };

    let _intervalCall = () => {
        _sendMessage(ST.COMMAND.INTERVAL);
    }

    function _createChar(asset, x, y, dir, action) {
        let parent = document.getElementById('main');
        let char = ST.generator.player(asset, action)

        let elem = char.getElement();
        parent.appendChild(elem);
        char.setLocate(x, y);
        char.setDir(dir);
        ST.core.addListner(char);
    }

    return {
        addListner: (chrObj) => {
            charList.add(chrObj);
        },
        deleteListner: (chrObj) => {
            charList.delete(chrObj);
        },
        sendMessage: _sendMessage,
        startIntervalTimer() {
            if (timerId==null) {
                timerId = setInterval(_intervalCall, 10);
            }
        },
        stopIntervalTimer() {
            if (timerId!=null) {
                clearInterval(timerId);
            }
            timerId = null;
        },
        createChar: _createChar,
    };
})();
