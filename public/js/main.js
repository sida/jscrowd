"use strict";


window.onload = () => {

    console.log("start");

    let parent = document.getElementById('main');
    adjustCroodAddEventListener(parent , adjustedOnClick);

    function adjustCroodAddEventListener(element, callback) {
        let parentInfo = element.getBoundingClientRect();
        element.addEventListener('click' ,adjust(callback, parentInfo.left, parentInfo.top), true);
    }

    function adjust(func, x, y) {
        let _x = Math.round(x);
        let _y = Math.round(y);
        let f = func;

        return (e) => {
            return f([e.clientX - _x, e.clientY - _y]);
        };
    }

    function adjustedOnClick(e) {
        console.log(e);
    }

    for (let i = 0; i < 2; i++) {
        // ランダムに動く
        let action1 = ST.generator.ActionRandom();
        ST.core.createChar(ST.assets.c1, Math.floor(Math.random() * 768) + 1, Math.floor(Math.random() * 568) + 1, ST.util.randDir(), action1);
        // 左右に動く
        let action2 = ST.generator.ActionBackAndForth();
        ST.core.createChar(ST.assets.c1, Math.floor(Math.random() * 768) + 1, Math.floor(Math.random() * 568) + 1, ST.util.randDirLateral(), action2);
    }

    ST.core.startIntervalTimer();
}
