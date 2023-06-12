'use strict';

ST.generator.ActionRandom = () => {
    let intervalCounter = Math.floor(Math.random() * 1000);

    let _procInterval = (my) => {
        intervalCounter++;
        if (intervalCounter >= 1000) {
            intervalCounter = 0;
        }

        if ((intervalCounter % 600) == 0) {
            // 時々ランダムに方向を変える
            my.setDir(ST.util.randDir());
        }

        const c = intervalCounter % 30;
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
        message: ()=>{},
    }
};

ST.generator.ActionBackAndForth = () => {
    let intervalCounter = Math.floor(Math.random() * 1000);

    let _procInterval = (my) => {
        intervalCounter++;
        if (intervalCounter >= 1000) {
            intervalCounter = 0;
        }

        if (Math.floor(Math.random() * 1500) == 0) {
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

        const c = intervalCounter % 30;
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
        message: ()=>{},
    }
};

ST.generator.ActionAssemble = () => {
    const MODE = {
        random:0,
        assemble:1,
    };
    let mode = MODE.random;
    let intervalCounter = Math.floor(Math.random() * 1000);

    let assemblePoint = null;

    let _message = (my, message)=> {
        const command = message[0];
        if (command == ST.COMMAND.ASSEMBLE) {
            assemblePoint = message[1];
            mode = MODE.assemble;
            intervalCounter = 0;
        }
    };

    let _procInterval = (my) => {
        intervalCounter++;
        if (intervalCounter >= 3000) {
            // 3秒でランダムモードに戻る
            mode = MODE.random;
            assemblePoint = null;
            intervalCounter = 0;
        }

        if (mode == MODE.random) {
            randamAction(my);
        } else {
            assembleAction(my);
        }
    }

    function randamAction(my) {
        if ((intervalCounter % 200) == 0) {
            // 2秒ごとにランダムに方向を変える
            my.setDir(ST.util.randDir());
        }

        const c = intervalCounter % 30;
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

    function assembleAction(my) {
        if (assemblePoint == null) {
            mode = MODE.random;
            return;
        }

        const loc = my.getLocation();
        if (arrival(loc , assemblePoint)) {
            // 到着したらランダムモードに
            mode = MODE.random;
            return;
        }

        const c = intervalCounter % 30;
        switch (c) {
            case 0:
                const dir = calcMoveDir(loc , assemblePoint)
                my.setPose(dir, loc.pose + 1);
                break;
            case 1:
                if (!my.move()) {
                    my.setDir(ST.util.randDir());
                }
                break;
        }
    }

    function arrival(loc , toPoint) {
        if (toPoint == null) {
            return true;
        }

        const cx = loc.x;
        const cy = loc.y;
        const tx = toPoint.x;
        const ty = toPoint.y;

        const dx = Math.abs(tx - cx);
        const dy = Math.abs(ty - cy);

        return (dx <= 10) && (dy <= 10);
    }

    function calcMoveDir(loc , toPoint) {
        const cx = loc.x;
        const cy = loc.y;
        const tx = toPoint.x;
        const ty = toPoint.y;

        const dx = Math.abs(tx - cx);
        const dy = Math.abs(ty - cy);

        const sx = Math.sign(tx - cx);
        const sy = Math.sign(ty - cy);

        if (dx > dy) {
            if (sx > 0) {
                return ST.DIR.RIGHT;
            }
            return ST.DIR.LEFT;
        } else {
            if (sy > 0) {
                return ST.DIR.DOWN;
            }
            return ST.DIR.UP;
        }
    }

    return {
        procInterval: _procInterval,
        message: _message,
    }
};