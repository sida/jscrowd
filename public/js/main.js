"use strict";


window.onload = () => {

    console.log("start");

    for (let i = 0; i < 50; i++) {
        createChar(ST.assets.c1, Math.floor(Math.random() * 768), Math.floor(Math.random() * 568), Math.floor(Math.random() * 4) + 1);
    }
    for (let i = 0; i < 50; i++) {
        createChar(ST.assets.c2, Math.floor(Math.random() * 768), Math.floor(Math.random() * 568), Math.floor(Math.random() * 4) + 1);
    }

    ST.core.startAnime();

    function createChar(asset, x, y, dir) {
        let parent = document.getElementById('main');

        // let char = new Villager(ST.assets.c1);

        let char = ST.generator.player(asset)

        let elem = char.getElement();
        parent.appendChild(elem);
        char.setLocate(x, y);
        char.setDir(dir);
        ST.core.addListner(char);
    }
}
