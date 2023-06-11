'use strict';

ST.util = (() => {
    return {
        randDir: () => {
            return Math.floor(Math.random() * 4) + 1;
        },
        randDirLateral: () => {
            const p = [ST.DIR.LEFT,ST.DIR.RIGHT];
            return p[Math.floor(Math.random() * 2)];
        },
    };
})();
