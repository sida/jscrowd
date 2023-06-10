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
    STOP: 0,
    START: 1,
});

ST.core = (() => {
    let charList = new Set();
    let timerId = null;

    return {
        addListner: (chrObj) => {
            charList.add(chrObj);
        },
        deleteListner: (chrObj) => {
            charList.delete(chrObj);
        },
        sendMessage: (commande, param) => {
            const message = Object.freeze([commande,param]);
            charList.forEach((obj) => {
                obj.message(message);
            });
        },
        callAnime() {
            charList.forEach((obj) => {
                obj.nextPose();
            });
        },
        startAnime() {
            if (timerId==null) {
                timerId = setInterval(ST.core.callAnime, 300);
            }
        },
        stopAnime() {
            if (timerId!=null) {
                clearInterval(timerId);
            }
            timerId = null;
        },
    };
})();
