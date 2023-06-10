'use strict';

ST.util = (() => {
    return {
        randDir: () => {
            return Math.floor(Math.random() * 4) + 1;
        },
    };
})();
