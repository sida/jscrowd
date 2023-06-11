'use strict';

ST.generator.ActionRandom = () => {
    let intervalCounter = Math.floor(Math.random() * 1000);

    let _procInterval = (my) => {
        // console.log(my);
        intervalCounter++;
        if (intervalCounter >= 1000) {
            intervalCounter = 0;
        }

        if ((intervalCounter % 200) == 0) {
            // 時々ランダムに方向を変える
            my.setDir(ST.util.randDir());
        }

        const c = intervalCounter % 10;
        switch (c) {
            case 0:
                const loc = my.getLocation();
                my.setPose(loc.dir, loc.pose + 1);
                break;
            case 1:
                if (!my.move()) {
                    my.setDir(ST.util.randDir());
                }
                break;
        }
    }

    return {
        procInterval: _procInterval,
    }
};

ST.generator.ActionBackAndForth = () => {
    let intervalCounter = Math.floor(Math.random() * 1000);

    let _procInterval = (my) => {
        intervalCounter++;
        if (intervalCounter >= 1000) {
            intervalCounter = 0;
        }

        if (Math.floor(Math.random() * 500) == 0) {
            // 時々反対方向に向ける
            const loc = my.getLocation();
            switch (loc.dir) {
                case ST.DIR.LEFT:
                    my.setDir(ST.DIR.RIGHT)
                    break;
                case ST.DIR.RIGHT:
                    my.setDir(ST.DIR.LEFT)
                    break;
                default:
                    my.setDir(ST.util.randDirLateral());
                    break;
            }
        }

        const c = intervalCounter % 10;
        switch (c) {
            case 0:
                const loc = my.getLocation();
                my.setPose(loc.dir, loc.pose + 1);
                break;
            case 1:
                if (!my.move()) {
                    my.setDir(ST.util.randDir());
                }
                break;
        }
    }

    return {
        procInterval: _procInterval,
    }
};