"use strict";


window.onload = () => {

    console.log("start");

    // 人50人生成
    for (let i = 0; i < 50; i++) {
        ST.core.createChar(ST.assets.c1, Math.floor(Math.random() * 768) + 1, Math.floor(Math.random() * 568) + 1, Math.floor(Math.random() * 4) + 1);
    }
    // // 猫50人生成
    // for (let i = 0; i < 50; i++) {
    //     ST.core.createChar(ST.assets.c2, Math.floor(Math.random() * 768) + 1, Math.floor(Math.random() * 568) + 1, Math.floor(Math.random() * 4) + 1);
    // }

    ST.core.startIntervalTimer();

    function createChar(asset, x, y, dir) {
        let parent = document.getElementById('main');
        let char = ST.generator.player(asset)

        let elem = char.getElement();
        parent.appendChild(elem);
        char.setLocate(x, y);
        char.setDir(dir);
        ST.core.addListner(char);
    }
}
